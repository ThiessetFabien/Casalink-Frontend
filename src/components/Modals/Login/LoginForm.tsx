import { FormEvent } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { actionSwitchLoginModal } from '../../../store/reducer/modal';

interface LoginFormProps {
  handleLogin: () => void;
}

function LoginForm({ handleLogin }: LoginFormProps) {
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
    dispatch(actionSwitchLoginModal());
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Conexion</h1>
      <div className="login_field">
        <input
          className="input_required"
          type="text"
          name="username"
          id="username"
          required
        />
        <label htmlFor="username">Nom d'utilisateur</label>
      </div>
      <div className="login_field">
        <input
          className="input_required"
          type="password"
          name="password"
          id="password"
          required
        />
        <label htmlFor="password">Mot de passe</label>
      </div>
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default LoginForm;
