import './LandingPage.scss';

function LandingPage() {
  return (
    <div className="landingPage">
      <h1 className="landingPage-title">
        Plannifier le quotidien de votre foyer !
      </h1>
      <img className="landingPage-img" src="public/logo512.png" alt="test" />
      <ul className="landingPage-listeFonctionnalite">
        <li className="landingPage-listeItem">
          <button className="landingPage-listeItem-btn" type="button">
            Agenda
          </button>
        </li>
        <li className="landingPage-listeItem">
          <button className="landingPage-listeItem-btn" type="button">
            Météo
          </button>
        </li>
        <li className="landingPage-listeItem">
          <button className="landingPage-listeItem-btn" type="button">
            Liste de course
          </button>
        </li>
        <li className="landingPage-listeItem">
          <button className="landingPage-listeItem-btn" type="button">
            Budget partagé
          </button>
        </li>
      </ul>
      <div className="landingPage-divDescription">
        <p className="landingPage-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          nemo nostrum aliquid fuga suscipit blanditiis. Aut veniam nulla amet
          at exercitationem, ducimus commodi iusto praesentium expedita,
          pariatur voluptatibus repellendus ex?
        </p>
        <button className="landingPage-button" type="button">
          Essayez l&apos;application
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
