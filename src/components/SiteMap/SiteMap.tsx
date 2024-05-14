import './SiteMap.scss';

function SiteMap() {
  return (
    <div className="SiteMap">
      <h1 className="SiteMap_title">Plan du site</h1>
      <ul className="SiteMap_listItems">
        <li>Accueil (URL)</li>
        <li>Contact (URL)</li>
        <li>Mentions légales (URL)</li>
        <li>Foyer (URL)</li>
      </ul>
    </div>
  );
}

export default SiteMap;
