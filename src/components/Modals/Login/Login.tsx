import { useEffect, useRef, useState } from 'react';
import './Login.scss';
import { X } from 'react-feather';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionSwitchLoginModal } from '../../../store/reducer/modal';
import {
  actionChangeCredentials,
  actionLogin,
} from '../../../store/reducer/user';
import actionCheckLogin from '../../../store/thunks/checkLogin';

function Login() {
  const dispatch = useAppDispatch();
  const [loginForm, setLoginForm] = useState(true);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Input controlled by redux for the login form
  const { emailSignin, passwordSignin } = useAppSelector(
    (state) => state.user.credentials.login
  );

  // Input controlled by redux for the signup form
  const { email, password, passwordConfirm, street, postalCode, country } =
    useAppSelector((state) => state.user.credentials.signup);

  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.focus();
    }
  }, []);

  // Prevent the click propagation
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  return (
    <div
      className="login_background"
      role="button"
      tabIndex={0}
      ref={backgroundRef}
      onClick={() => {
        dispatch(actionSwitchLoginModal());
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') dispatch(actionSwitchLoginModal());
      }}
    >
      <div
        className="login_modal"
        role="presentation"
        onClick={handleModalClick}
      >
        <button
          type="button"
          className="exit_button"
          onClick={() => {
            dispatch(actionSwitchLoginModal());
          }}
        >
          <X />
        </button>
        {loginForm && (
          <LoginForm
            email={emailSignin}
            password={passwordSignin}
            changeField={(name, value) => {
              dispatch(
                actionChangeCredentials({
                  name,
                  value,
                })
              );
            }}
            handleLogin={() => {
              dispatch(actionCheckLogin());
            }}
          />
        )}
        {!loginForm && <SignupForm />}
        {loginForm ? (
          <button
            className="login_modal_changeFormBtn"
            type="button"
            onClick={() => {
              setLoginForm(false);
            }}
          >
            Pas de compte ?
          </button>
        ) : (
          <button
            className="login_modal_changeFormBtn"
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
