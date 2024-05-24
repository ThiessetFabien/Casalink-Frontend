import './SideNavBurger.scss';
import { Link, NavLink } from 'react-router-dom';
import {
  AtSign,
  Home,
  LogOut,
  Map,
  Moon,
  Sun,
  ToggleLeft,
  ToggleRight,
  Users,
} from 'react-feather';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  actionSwitchDarkMode,
  actionSwitchSideMenuModal,
} from '../../../store/reducer/modal';
import { actionLogout } from '../../../store/reducer/user';

interface SideNavPropsI {
  isConnected: boolean;
}

function SideNavBurger({ isConnected }: SideNavPropsI) {
  const [hideToggleLeft, setHideToggleLeft] = useState(false);
  const [hideToggleRight, setHideToggleRight] = useState(true);
  const [hoverBtnIsActive, setHoverBtnIsActive] = useState(false);

  const sideMenuModalIsOpen = useAppSelector(
    (state) => state.modal.sideMenuModalIsOpen
  );
  const DarkModeIsActive = useAppSelector(
    (state) => state.modal.darkModeIsActive
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        className={`btnSideBarMenu ${
          sideMenuModalIsOpen && 'btnSideBarMenu-open'
        }`}
        type="button"
        onClick={() => {
          dispatch(actionSwitchSideMenuModal());
        }}
        onMouseEnter={() => {
          setHoverBtnIsActive((oldHover) => !oldHover);
        }}
        onMouseLeave={() => {
          setHoverBtnIsActive((oldHover) => !oldHover);
        }}
      >
        <span className="btnSideBarMenu-bar" />
      </button>
      <nav
        className={`sideMenu ${sideMenuModalIsOpen && 'sideMenu-open'} ${
          hoverBtnIsActive && 'sideMenu-hover'
        } `}
      >
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}
          // style={({ isActive }) => {
          //   return {
          //     fontWeight: isActive ? 'bold' : '',
          //     color: isActive ? 'red' : 'black',
          //   };
          // }}
        >
          {!sideMenuModalIsOpen && (
            <Home className="sideNavIcon sideNavIcon-hidden" />
          )}
          <span
            className={`navLink_desc ${
              hoverBtnIsActive && 'navLink_desc-hidden'
            }  `}
          >
            Accueil
          </span>
        </NavLink>
        <NavLink
          to="/foyer"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {!sideMenuModalIsOpen && (
            <Users className="sideNavIcon sideNavIcon-hidden" />
          )}
          <span
            className={`navLink_desc ${
              hoverBtnIsActive && 'navLink_desc-hidden'
            }  `}
          >
            Mon foyer
          </span>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {!sideMenuModalIsOpen && (
            <AtSign className="sideNavIcon sideNavIcon-hidden" />
          )}
          <span
            className={`navLink_desc ${
              hoverBtnIsActive && 'navLink_desc-hidden'
            }  `}
          >
            Contact et mention légales
          </span>
        </NavLink>
        <NavLink
          to="/sitemap"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {!sideMenuModalIsOpen && (
            <Map className="sideNavIcon sideNavIcon-hidden" />
          )}
          <span
            className={`navLink_desc ${
              hoverBtnIsActive && 'navLink_desc-hidden'
            }  `}
          >
            Site map
          </span>
        </NavLink>
        {isConnected && (
          <Link
            to="/"
            className="btn_deco"
            onClick={() => {
              dispatch(actionLogout());
            }}
          >
            {!sideMenuModalIsOpen && (
              <LogOut className="sideNavIcon sideNavIcon-hidden" />
            )}
            <span
              className={`navLink_desc ${
                hoverBtnIsActive && 'navLink_desc-hidden'
              }  `}
            >
              Déconnexion
            </span>
          </Link>
        )}

        <ToggleLeft
          className={`test ${!hideToggleRight && 'test-hidden'}`}
          onClick={() => {
            setHideToggleRight((oldHide) => !oldHide);
            setHideToggleLeft((oldHide) => !oldHide);
            dispatch(actionSwitchDarkMode());
          }}
        />
        <ToggleRight
          className={`test2 ${hideToggleRight ? 'test2-hidden' : ''}`}
          onClick={() => {
            setHideToggleRight(!hideToggleRight);
            setHideToggleLeft(!hideToggleLeft);
            dispatch(actionSwitchDarkMode());
          }}
        />
        {DarkModeIsActive ? (
          <Sun className="darkModeIcon" />
        ) : (
          <Moon className="sunModeIcon" />
        )}
      </nav>
    </>
  );
}

export default SideNavBurger;
