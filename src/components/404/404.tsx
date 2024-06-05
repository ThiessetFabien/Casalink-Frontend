import { Link } from 'react-router-dom';
import './404.scss';

function NotFount() {
  return (
    <div className="container">
      <h1 className="container_h1">404 : Page introuvable</h1>
      <img
        className="container_img"
        src="src/assets/chapeau-1293807_1280.png"
        alt="Homme perdu"
      />
      <p className="container_p">Vous êtes perdu ? Revenez sur vos pas !</p>
      <Link to="/">
        <button className="container_button" type="button">
          Accueil
        </button>
      </Link>
    </div>
  );
}
export default NotFount;
