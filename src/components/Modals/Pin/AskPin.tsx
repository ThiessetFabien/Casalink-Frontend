import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux.js';
import { actionSwitchPinModal } from '../../../store/reducer/modal.js';
import {
  actionChangePinErrorMessage,
  actionResetErrorMessage,
} from '../../../store/reducer/user.js';
import './AskPin.scss';

function AskPin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [inputValue, SetInputValue] = useState('');
  const backgroundTaskRef = useRef<HTMLDivElement>(null);
  const selectedProfile = useAppSelector(
    (state) => state.profile.memberSelected
  );

  useEffect(() => {
    if (backgroundTaskRef.current) {
      backgroundTaskRef.current.focus();
    }
  }, []);

  const errorMessage = useAppSelector((state) => state.user.error);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      selectedProfile &&
      selectedProfile.pin &&
      inputValue === selectedProfile.pin.toString()
    ) {
      navigate('/');
      dispatch(actionResetErrorMessage());
      return dispatch(actionSwitchPinModal());
    }
    return dispatch(actionChangePinErrorMessage());
  };

  const handleChangePin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    SetInputValue(value);
  };

  return (
    <div className="formDiv" ref={backgroundTaskRef}>
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
