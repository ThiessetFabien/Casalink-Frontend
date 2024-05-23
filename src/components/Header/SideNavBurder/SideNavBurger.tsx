import './SideNavBurger.scss';
import { Link, NavLink } from 'react-router-dom';
import { Moon, Sun, ToggleLeft, ToggleRight } from 'react-feather';
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

  const taskModalIsOpen = useAppSelector(
    (state) => state.modal.sideMenuModalIsOpen
  );
  const DarkModeIsActive = useAppSelector(
    (state) => state.modal.darkModeIsActive
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        className={`btnSideBarMenu ${taskModalIsOpen && 'btnSideBarMenu-open'}`}
        type="button"
        onClick={() => {
          dispatch(actionSwitchSideMenuModal());
        }}
      >
        <span className="btnSideBarMenu-bar" />
      </button>
      <nav className={`sideMenu ${taskModalIsOpen && 'sideMenu-open'}`}>
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
          Accueil
        </NavLink>
        <NavLink
          to="/foyer"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Mon foyer
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Contact et mention légales
        </NavLink>
        <NavLink
          to="/sitemap"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Site map
        </NavLink>
        {isConnected && (
          <Link
            to="/"
            className="btn_deco"
            onClick={() => {
              dispatch(actionLogout());
            }}
          >
            Déconnexion
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
