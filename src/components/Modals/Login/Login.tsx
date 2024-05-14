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
    <div className="LoginBackground">
      <div className="LoginModal">
        {loginForm && <LoginForm />}
        {!loginForm && <SignupForm />}
        {loginForm ? (
          <button
            className="LoginModal_changeFormBtn"
            type="button"
            onClick={() => {
              setLoginForm(false);
            }}
          >
            Pas de compte ?
          </button>
        ) : (
          <button
            className="LoginModal_changeFormBtn"
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
