import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  return (
    <div className="Footer">
      <Link to="/contact" className="Footer_listItems_btn">
        Contact
      </Link>

      <Link to="/contact" className="Footer_listItems_btn">
        Mentions légales
      </Link>

      <Link to="/sitemap" className="Footer_listItems_btn">
        Site map
      </Link>
    </div>
  );
}

export default Footer;
