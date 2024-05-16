import { Link } from 'react-router-dom';
import './SiteMap.scss';

function SiteMap() {
  return (
    <div className="sitemap">
      <h1 className="sitemap_title">Plan du site</h1>
      <div className="boxForInfo">
        <span className="sitemap_item">
          <Link to="/" className="sitemap_linkItem">
            Accueil :
          </Link>
          http://localhost:5173/
        </span>
        <span className="sitemap_item">
          <Link to="/contact" className="sitemap_linkItem">
            Contact :
          </Link>
          http://localhost:5173/contact
        </span>
        <span className="sitemap_item">
          <Link to="/contact" className="sitemap_linkItem">
            Mentions légales :
          </Link>{' '}
          http://localhost:5173/contact
        </span>
        <span className="sitemap_item">
          <Link to="/sitemap" className="sitemap_linkItem">
            Foyer :
          </Link>
          http://localhost:5173/foyer
        </span>
      </div>
    </div>
  );
}

export default SiteMap;
