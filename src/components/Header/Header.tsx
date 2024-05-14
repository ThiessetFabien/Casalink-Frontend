import './Header.scss';

function Header() {
  return (
    <div className="Header">
      <nav className="Header-menuItems">
        <h1 className="Header-title">CasaLink</h1>
        <button type="button">S&apos;inscrire</button>
        <button type="button">Se connecter</button>
      </nav>
    </div>
  );
}

export default Header;
