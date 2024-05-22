import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionSwitchLoginModal } from '../../../store/reducer/modal';
import actionCheckLogin from '../../../store/thunks/checkLogin';

interface LoginFormProps {
  email: string;
  password: string;
  changeField: (name: 'emailSignin' | 'passwordSignin', value: string) => void;
}

function LoginForm({ email, password, changeField }: LoginFormProps) {
  const dispatch = useAppDispatch();

  const errorMessages = useAppSelector((state) => state.user.error);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(errorMessages);
    const resultAction = await dispatch(actionCheckLogin());
    if (actionCheckLogin.fulfilled.match(resultAction))
      dispatch(actionSwitchLoginModal());
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Connexion</h1>
      <div className="login_field">
        <input
          value={email}
          onChange={(e) => {
            changeField('emailSignin', e.target.value);
          }}
          className="input_required"
          type="text"
          name="username"
          id="username"
          required
        />
        <label htmlFor="username">Nom d&apos;utilisateur</label>
      </div>
      <div className="login_field">
        <input
          value={password}
          onChange={(e) => {
            changeField('passwordSignin', e.target.value);
          }}
          className="input_required"
          type="password"
          name="password"
          id="password"
          required
        />
        <label htmlFor="password">Mot de passe</label>
      </div>
      <span className="errorMessage">{errorMessages}</span>
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default LoginForm;
