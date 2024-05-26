import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

import './Header.scss';
import Login from '../Modals/Login/Login';
import UserHeader from './UserHeader/UserConnectedHeader';
import BtnConnect from './BtnConnect/BtnConnect';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actionSwitchSideMenuModal } from '../../store/reducer/modal';

function Header() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);
  const loginModalIsOpen = useAppSelector(
    (state) => state.modal.loginModalIsOpen
  );
  const isMenuOpen = useAppSelector((state) => state.modal.sideMenuModalIsOpen);
  const isConnected = useAppSelector((state) => state.user.logged);
  return (
    <div className={`${isDarkMode ? 'dark' : ''} header`}>
      <img
        src="public/testavatar.png"
        alt="userAvatar"
        className={`${isMenuOpen ? 'header_avatar-menuOpen' : 'header_avatar'}`}
      />
      {/* <div className="header_menuItems"> */}
      {/* {isConnected && <UserHeader />} */}
      <Link to="/" className="header_title">
        <div className="header_logoDiv">
          <img
            className="header_logo"
            src="public/logo-casalink-lettre.svg"
            alt="logo casaLink"
          />
        </div>
      </Link>
      <div
        className={`${
          isMenuOpen ? 'header_menuMobile-open' : 'header_menuMobile'
        }`}
      >
        <Link to="/" className="header_menuMobile_link">
          Accueil
        </Link>
        <Link to="/" className="header_menuMobile_link">
          Mon foyer
        </Link>
        <Link to="/" className="header_menuMobile_link">
          Préférences
        </Link>
        <Link to="/" className="header_menuMobile_link">
          Contact
        </Link>
        <Link to="/" className="header_menuMobile_link">
          Déconnexion
        </Link>
      </div>
      {/* <div className="header_BtnMenuMobileDiv">
        <GiHamburgerMenu
          className={`${
            isMenuOpen ? 'header_btnMenuMobile-open' : 'header_btnMenuMobile'
          }`}
          onClick={() => {
            dispatch(actionSwitchSideMenuModal());
          }}
        /> */}
      <div
        className={` ${isMenuOpen ? 'header_btnDiv-open' : 'header_btnDiv'}`}
      >
        <button
          className="header_BtnMenuMobile"
          type="button"
          onClick={() => {
            dispatch(actionSwitchSideMenuModal());
          }}
        >
          <span className="header-bar" />
        </button>
      </div>

      {/* </div> */}
      {!isConnected && <BtnConnect />}
      {loginModalIsOpen && <Login />}
    </div>
  );
}

export default Header;
