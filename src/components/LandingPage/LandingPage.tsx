import { useAppDispatch } from '../../hooks/redux';
import { actionSwitchLoginModal } from '../../store/reducer/modal';
import './LandingPage.scss';

function LandingPage() {
  const dispatch = useAppDispatch();

  return (
    <div className="landingPage">
      <ul className="landingPage_listeFonctionnalite">
        <h1 className="landingPage_title">
          Plannifier le quotidien de votre foyer !
        </h1>
        <li className="landingPage_listeItem">
          <button className="landingPage_btn btn-functionality" type="button">
            Agenda
          </button>
        </li>
        <li className="landingPage_listeItem">
          <button className="landingPage_btn btn-functionality" type="button">
            Méteo
          </button>
        </li>
        <li className="landingPage_listeItem">
          <button className="landingPage_btn btn-functionality" type="button">
            Liste de course
          </button>
        </li>
        <li className="landingPage_listeItem">
          <button className="landingPage_btn btn-functionality" type="button">
            Budget partagé
          </button>
        </li>
      </ul>
      <div className="landingPage_actionBox">
        <img className="landingPage_img" src="public/logo512.png" alt="test" />
        <div className="landingPage_divDescription">
          <p className="landingPage_description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            nemo nostrum aliquid fuga suscipit blanditiis. Aut veniam nulla amet
            at exercitationem, ducimus commodi iusto praesentium expedita,
            pariatur voluptatibus repellendus ex?
          </p>
          <button
            className="landingPage_btn btn-signin"
            type="button"
            onClick={() => {
              dispatch(actionSwitchLoginModal());
            }}
          >
            <span className="landingPage_btn-text">
              Essayez l&apos;application
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
