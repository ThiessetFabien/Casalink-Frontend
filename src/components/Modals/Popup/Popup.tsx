import { useEffect, useState } from 'react';
import './Popup.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionChangeClosePopup } from '../../../store/reducer/popup';

interface PopupPropsI {
  content: string;
  isOpen: boolean;
}

function Popup({ content, isOpen }: PopupPropsI) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(actionChangeClosePopup());
  };

  useEffect(() => {
    const duration = 3000;
    const timer = setTimeout(() => {
      dispatch(actionChangeClosePopup());
    }, duration);

    return () => clearTimeout(timer);
  }, [content, dispatch]);

  return (
    <button
      type="button"
      className={isOpen ? 'popup' : 'popup-isClosed'}
      onClick={handleClick}
    >
      <span className="popup_content">{content}</span>
    </button>
  );
}

export default Popup;
