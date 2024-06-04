import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux.js';
import { actionSwitchPinModal } from '../../../store/reducer/modal.js';
import {
  actionChangePinErrorMessage,
  actionResetErrorMessage,
} from '../../../store/reducer/user.js';
import './AskPin.scss';
import { log } from 'winston';

function AskPin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [inputValue, SetInputValue] = useState('');

  const selectedProfile = useAppSelector(
    (state) => state.profile.memberSelected
  );

  const errorMessage = useAppSelector((state) => state.user.error);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedProfile.pin);
    console.log(inputValue);

    if (selectedProfile && inputValue === selectedProfile.pin) {
      navigate('/');
      dispatch(actionResetErrorMessage());
      return dispatch(actionSwitchPinModal());
    }
    dispatch(actionChangePinErrorMessage());
  };

  const handleChangePin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    SetInputValue(value);
  };

  return (
    <div className="formDiv">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="checkPin" className="form_label">
          Rentrez votre code PIN
        </label>
        <input
          onChange={handleChangePin}
          type="password"
          className="form_input_required"
          value={inputValue}
          placeholder="0000"
          required
        />
        {errorMessage && <div className="form_error">{errorMessage}</div>}
        <button type="submit" className="form_button">
          Valider
        </button>
      </form>
    </div>
  );
}

export default AskPin;
