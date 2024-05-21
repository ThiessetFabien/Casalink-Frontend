import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { actionSwitchLoginModal } from '../../store/reducer/modal';
import './LandingPage.scss';

function LandingPage() {
  const dispatch = useAppDispatch();
  const [imgTestVisiteur, setImgTestVisiteur] = useState(
    'src/assets/AgendaVisiteurCasalink.png'
  );
  return (
    <div className="landingPage">
      <div className="landingPage_BoxFunctionality">
        <h1 className="landingPage_title">
          Plannifier le quotidien de votre foyer !
        </h1>
        <ul className="landingPage_listeFonctionnalite">
          <li className="landingPage_listeItem">
            <button
              className="landingPage_btn btn-functionality"
              type="button"
              onClick={() =>
                setImgTestVisiteur('src/assets/AgendaVisiteurCasalink.png')
              }
            >
              Agenda
            </button>
          </li>
          <li className="landingPage_listeItem">
            <button
              className="landingPage_btn btn-functionality"
              type="button"
              onClick={() => setImgTestVisiteur('public/logo192.png')}
            >
              Méteo
            </button>
          </li>
          <li className="landingPage_listeItem">
            <button
              className=" landingPage_btn btn-functionality"
              type="button"
              onClick={() => setImgTestVisiteur('public/logo192.png')}
            >
              courses
            </button>
          </li>
          <li className="landingPage_listeItem">
            <button
              className="landingPage_btn btn-functionality"
              type="button"
              onClick={() => setImgTestVisiteur('public/logo192.png')}
            >
              Budget
            </button>
          </li>
        </ul>
      </div>

      <div className="landingPage_actionBox">
        <div className="landingPage_divDescription">
          <img className="landingPage_img" src={imgTestVisiteur} alt="test" />
          <p className="landingPage_description">
            Simplifier la gestion des emplois du temps, des tâches domestiques
            et des événements au sein de votre foyer.
          </p>
          <button
            className="btn-signin"
            type="button"
            onClick={() => {
              dispatch(actionSwitchLoginModal());
            }}
          >
            <span className="landingPage_btn-text">S&apos;inscrire</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
