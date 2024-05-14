import { useState } from 'react';
import './Login.scss';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface LoginProps {
  loginIsOpen: boolean;
}

function Login() {
  const [loginForm, setLoginForm] = useState(true);
  return (
    <div className="Login_background">
      <div className="Login_modal">
        {loginForm && <LoginForm />}
        {!loginForm && <SignupForm />}
        {loginForm ? (
          <button
            className="Login_modal_changeFormBtn"
            type="button"
            onClick={() => {
              setLoginForm(false);
            }}
          >
            Pas de compte ?
          </button>
        ) : (
          <button
            className="Login_modal_changeFormBtn"
            type="button"
            onClick={() => {
              setLoginForm(true);
            }}
          >
            Déjà un compte ?
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
