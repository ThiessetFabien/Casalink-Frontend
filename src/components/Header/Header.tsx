import { useAppDispatch } from '../../hooks/redux';
import { actionSwitchLoginModal } from '../../store/reducer/modal';
import './Header.scss';

function Header() {
  const dispatch = useAppDispatch();
  return (
    <div className="Header">
      <nav className="Header-menuItems">
        <h1 className="Header-title">CasaLink</h1>
        <button
          type="button"
          onClick={() => {
            dispatch(actionSwitchLoginModal());
          }}
        >
          Se connecter
        </button>
      </nav>
    </div>
  );
}

export default Header;
