import { Link } from 'react-router-dom';
import { TbMoonFilled } from 'react-icons/tb';
import { BiHomeAlt2 } from 'react-icons/bi';
import { MdFamilyRestroom, MdSettingsSuggest, MdWbSunny } from 'react-icons/md';
import { HiMail } from 'react-icons/hi';
import { IoLogOut } from 'react-icons/io5';

import './Header.scss';
import Login from '../Modals/Login/Login';
import BtnConnect from './BtnConnect/BtnConnect';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  actionSwitchDarkMode,
  actionSwitchSideMenuModal,
} from '../../store/reducer/modal';
import useIsOnSpecificPath from '../../utils/isOnSpecificPath';

// coucou c'est moi
function Header() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);
  const loginModalIsOpen = useAppSelector(
    (state) => state.modal.loginModalIsOpen
  );
  const isMenuOpen = useAppSelector((state) => state.modal.sideMenuModalIsOpen);
  const isConnected = useAppSelector((state) => state.user.logged);
  const memberSelected = useAppSelector(
    (state) => state.profile.memberSelected
  );

  const HandleSwitchDarkMode = () => {
    dispatch(actionSwitchDarkMode());
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} header`}>
      {isConnected && memberSelected && (
        <img
          src="public/testavatar.png"
          alt="userAvatar"
          className={`${
            isMenuOpen ? 'header_avatar-menuOpen' : 'header_avatar'
          }`}
        />
      )}
      {/* <div className="header_menuItems"> */}
      {/* {isConnected && <UserHeader />} */}
      <Link to="/" className="header_title">
        <div className="header_logoDiv">
          <img
            className="header_logo"
            src="/logo-casalink-lettre-v2.webp"
            alt="logo casaLink"
          />
        </div>
      </Link>
      <div
        className={`${
          isMenuOpen ? 'header_menuMobile-open' : 'header_menuMobile'
        }`}
      >
        <div className="header_menuMobileDiv" onMouseEnter={() => {}}>
          <div>
            <BiHomeAlt2 className="header_menuMobile_icon" />
          </div>
          <Link to="/" className="header_menuMobile_link">
            Accueil
          </Link>
        </div>
        <div className="header_menuMobileDiv">
          <MdFamilyRestroom className="header_menuMobile_icon" />
          <Link to="/foyer" className="header_menuMobile_link">
            Mon foyer
          </Link>
        </div>
        <div className="header_menuMobileDiv">
          <MdSettingsSuggest className="header_menuMobile_icon" />
          <Link to="/setting" className="header_menuMobile_link">
            Préférences
          </Link>
        </div>
        <div className="header_menuMobileDiv">
          <HiMail className="header_menuMobile_icon" />
          <Link to="/contact" className="header_menuMobile_link">
            Contact
          </Link>
        </div>
        <div className="header_menuMobileDiv">
          <IoLogOut className="header_menuMobile_icon" />
          <Link to="/" className="header_menuMobile_link">
            Déconnexion
          </Link>
        </div>
        <div className="header_menuMobileDiv">
          {isDarkMode ? (
            <TbMoonFilled
              className={`header_menuMobile_icon `}
              onClick={HandleSwitchDarkMode}
            />
          ) : (
            <MdWbSunny
              className="header_menuMobile_icon"
              onClick={HandleSwitchDarkMode}
            />
          )}
          <Link
            to="/"
            className="header_menuMobile_link"
            onClick={HandleSwitchDarkMode}
          >
            {isDarkMode ? 'Switch light' : 'Switch dark'}
          </Link>
        </div>
      </div>
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
      {/* <BtnConnect /> */}
      {!isConnected && <BtnConnect />}
      {loginModalIsOpen && <Login />}
    </div>
  );
}

export default Header;
