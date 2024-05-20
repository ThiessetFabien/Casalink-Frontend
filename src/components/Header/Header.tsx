import { Link } from 'react-router-dom';

import './Header.scss';
import Login from '../Modals/Login/Login';
import UserHeader from './UserHeader/UserConnectedHeader';
import BtnConnect from './BtnConnect/BtnConnect';
import { useAppSelector } from '../../hooks/redux';

function Header() {
  const loginModalIsOpen = useAppSelector(
    (state) => state.modal.loginModalIsOpen
  );
  const isConnected = useAppSelector((state) => state.user.logged);
  return (
    <div className="header">
      <nav className="header_menuItems">
        <Link to="/" className="header_title">
          CasaLink
        </Link>
        <Link to="/" className="header_foyer">
          Nom du foyer
        </Link>
        {isConnected ? <UserHeader /> : <BtnConnect />}
      </nav>

      {loginModalIsOpen && <Login />}
    </div>
  );
}

export default Header;
