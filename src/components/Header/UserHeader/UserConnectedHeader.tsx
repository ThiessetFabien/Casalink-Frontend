import { useAppSelector } from '../../../hooks/redux';
import './UserConnectedHeader.scss';

function UserHeader() {
  const isMenuOpen = useAppSelector((state) => state.modal.sideMenuModalIsOpen);

  return (
    <div className="userDiv">
      <img
        src="public/testavatar.png"
        alt="userAvatar"
        className={`${
          isMenuOpen ? 'userDiv_avatar-menuOpen' : 'userDiv_avatar'
        }`}
      />
    </div>
  );
}

export default UserHeader;
