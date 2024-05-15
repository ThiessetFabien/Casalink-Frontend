import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actionSwitchLoginModal } from '../../store/reducer/modal';
import './LandingPage.scss';

function LandingPage() {
  const dispatch = useAppDispatch();

  return (
    <div className="landingPage">
      <h1 className="landingPage-title">
        Plannifier le quotidien de votre foyer !
      </h1>
      <div className="landingPage_actionBox">
        <img className="landingPage_img" src="public/logo512.png" alt="test" />
        <button
          className="landingPage_btn"
          type="button"
          onClick={() => {
            dispatch(actionSwitchLoginModal());
          }}
        >
          Essayez l&apos;application
        </button>
      </div>
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
      </div>
    </div>
  );
}

export default LandingPage;
