import { useState } from 'react';

import './SideNavBurger.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionSwitchSideMenuModal } from '../../../store/reducer/modal';

function SideNavBurger() {
  const taskModalIsOpen = useAppSelector(
    (state) => state.modal.sideMenuModalIsOpen
  );
  const dispatch = useAppDispatch();

  return (
    <button
      className={`BtnSideBarMenu ${taskModalIsOpen && 'BtnSideBarMenu-open'}`}
      type="button"
      onClick={() => {
        dispatch(actionSwitchSideMenuModal());
      }}
    >
      <span className="BtnSideBarMenu-bar" />
    </button>
  );
}

export default SideNavBurger;
