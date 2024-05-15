import { useEffect, useRef, useState } from 'react';
import './Login.scss';
import { X } from 'react-feather';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAppDispatch } from '../../../hooks/redux';
import { actionSwitchLoginModal } from '../../../store/reducer/modal';

interface LoginProps {
  loginIsOpen: boolean;
}

function Login({ loginIsOpen }: LoginProps) {
  const dispatch = useAppDispatch();
  const [loginForm, setLoginForm] = useState(true);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loginIsOpen && backgroundRef.current) {
      backgroundRef.current.focus();
    }
  }, [loginIsOpen]);

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
        {loginForm && <LoginForm />}
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
