import { Link } from 'react-router-dom';

import './Header.scss';
import Login from '../Modals/Login/Login';
import UserHeader from './UserHeader/UserConnectedHeader';
import BtnConnect from './BtnConnect/BtnConnect';
import { useAppSelector } from '../../hooks/redux';
import SideNavBurger from './SideNavBurder/SideNavBurger';

function Header() {
  const loginModalIsOpen = useAppSelector(
    (state) => state.modal.loginModalIsOpen
  );
  const isConnected = useAppSelector((state) => state.user.logged);
  return (
    <div className="header">
      <SideNavBurger isConnected={isConnected} />

      <div className="header_menuItems">
        <Link to="/" className="header_title">
          <img
            className="header_logo"
            src="public/logo-casalink-lettre.svg"
            alt="logo casaLink"
          />
        </Link>
        {isConnected && <UserHeader />}

        {!isConnected && <BtnConnect />}
        {/* {isConnected && <SideNavBurger />} */}
      </div>

      {loginModalIsOpen && <Login />}
    </div>
  );
}

export default Header;
