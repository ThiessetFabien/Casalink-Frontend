import { Link } from 'react-router-dom';

import './Header.scss';
import Login from '../Modals/Login/Login';
import UserHeader from './UserHeader/UserConnectedHeader';
import BtnConnect from './BtnConnect/BtnConnect';
import { useAppSelector } from '../../hooks/redux';
import BurgerNav from './BurgerNav/BurgerNav';
import SideNavBurger from './SideNavBurder/SideNavBurger';

function Header() {
  const loginModalIsOpen = useAppSelector(
    (state) => state.modal.loginModalIsOpen
  );
  const isConnected = useAppSelector((state) => state.user.logged);
  return (
    <div className="header">
      <SideNavBurger />
      <div className="header_menuItems">
        {isConnected && <UserHeader />}
        <Link to="/" className="header_title">
          CasaLink
        </Link>

        {!isConnected && <BtnConnect />}
        {/* {isConnected && <SideNavBurger />} */}

        <BurgerNav />
      </div>

      {loginModalIsOpen && <Login />}
    </div>
  );
}

export default Header;
