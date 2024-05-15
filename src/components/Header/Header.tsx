import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actionSwitchLoginModal } from '../../store/reducer/modal';
import './Header.scss';
import Login from '../Modals/Login/Login';
import { Link } from 'react-router-dom';

function Header() {
  const dispatch = useAppDispatch();
  const loginModalIsOpen = useAppSelector(
    (state) => state.modal.loginModalIsOpen
  );
  return (
    <div className="Header">
      <nav className="Header_menuItems">
        <h1 className="Header_title">
          <Link className="Header_link" to="/">
            CasaLink
          </Link>
        </h1>
        <button
          type="button"
          onClick={() => {
            dispatch(actionSwitchLoginModal());
          }}
        >
          Se connecter
        </button>
      </nav>
      {loginModalIsOpen && <Login loginIsOpen={loginModalIsOpen} />}
    </div>
  );
}

export default Header;
