import { Link } from 'react-router-dom';

import './Header.scss';
import Login from '../Modals/Login/Login';
import UserHeader from './UserHeader/UserConnectedHeader';
import BtnConnect from './BtnConnect/BtnConnect';
import { useAppSelector } from '../../hooks/redux';

function Header() {
  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);
  const loginModalIsOpen = useAppSelector(
    (state) => state.modal.loginModalIsOpen
  );
  const isConnected = useAppSelector((state) => state.user.logged);
  return (
    <div className={`${isDarkMode ? 'dark' : ''} header`}>
      <div className="header_menuItems">
        {isConnected && <UserHeader />}
        <Link to="/" className="header_title">
          <img
            className="header_logo"
            src="public/logo-casalink-lettre.svg"
            alt="logo casaLink"
          />
        </Link>

        {!isConnected && <BtnConnect />}
      </div>

      {loginModalIsOpen && <Login />}
    </div>
  );
}

export default Header;
