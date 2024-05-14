import './Footer.scss';

function Footer() {
  return (
    <div className="Footer">
      <ul className="Footer-listItems">
        <li className="Footer-listItems">
          <button className="Footer-listItems-btn" type="button">
            Contact
          </button>
        </li>
        <li className="Footer-listItems">
          <button className="Footer-listItems-btn" type="button">
            Mentions légales
          </button>
        </li>
        <li className="Footer-listItems">
          <button className="Footer-listItems-btn" type="button">
            Site map
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
