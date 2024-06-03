import { useState } from 'react';
import {
  FaCloudSunRain,
  FaCloudMoonRain,
  FaShoppingBasket,
  FaShoppingCart,
  FaHandHoldingUsd,
} from 'react-icons/fa';
import { useAppDispatch } from '../../hooks/redux';
import {
  actionSetModeLoginModal,
  actionSwitchLoginModal,
} from '../../store/reducer/modal';
import './LandingPage.scss';

function LandingPage() {
  const dispatch = useAppDispatch();
  const [imgTestVisiteur, setImgTestVisiteur] = useState(
    'src/assets/agenda.webp'
  );
  const [showMeteo, setShowMeteo] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showBudget, setShowBudget] = useState(false);

  const toggleMeteo = () => {
    setShowMeteo(!showMeteo);
    setImgTestVisiteur('public/logo192.png');
    setShowCourses(false);
    setShowBudget(false);
  };

  const toggleCourses = () => {
    setShowCourses(!showCourses);
    setImgTestVisiteur('public/logo192.png');
    setShowMeteo(false);
    setShowBudget(false);
  };

  const toggleBudget = () => {
    setShowBudget(!showBudget);
    setImgTestVisiteur('public/logo192.png');
    setShowMeteo(false);
    setShowCourses(false);
  };

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
              onClick={() => {
                setImgTestVisiteur('src/assets/agenda.webp');
                setShowMeteo(false);
                setShowCourses(false);
                setShowBudget(false);
              }}
            >
              Agenda
            </button>
          </li>
          <li className="landingPage_listeItem">
            <button
              className="landingPage_btn btn-functionality"
              type="button"
              onClick={toggleMeteo}
            >
              Météo
            </button>
          </li>
          <li className="landingPage_listeItem">
            <button
              className=" landingPage_btn btn-functionality"
              type="button"
              onClick={toggleCourses}
            >
              Courses
            </button>
          </li>
          <li className="landingPage_listeItem">
            <button
              className="landingPage_btn btn-functionality"
              type="button"
              onClick={toggleBudget}
            >
              Budget
            </button>
          </li>
        </ul>
      </div>

      <div className="landingPage_actionBox">
        <div className="landingPage_divDescription">
          {showMeteo && (
            <div className="landingPage_divDescription_iconesMeteo">
              <FaCloudSunRain className="iconeSun" />
              <FaCloudMoonRain className="iconeMoon" />
            </div>
          )}
          {showCourses && (
            <div className="landingPage_divDescription_courses">
              <FaShoppingBasket className="iconeBasket" />
              <FaShoppingCart className="iconeCart" />
            </div>
          )}
          {showBudget && (
            <div className="landingPage_divDescription_budget">
              <FaHandHoldingUsd className="iconeBudget" />
            </div>
          )}
          {!showMeteo && !showCourses && !showBudget && (
            <img className="landingPage_img" src={imgTestVisiteur} alt="test" />
          )}
          <p className="landingPage_description">
            Simplifiez la gestion des emplois du temps, des tâches domestiques
            et des événements au sein de votre foyer.
          </p>
          <button
            className="btn-signin"
            type="button"
            onClick={() => {
              dispatch(actionSetModeLoginModal('signup'));
              dispatch(actionSwitchLoginModal());
            }}
          >
            <span className="landingPage_btn-text">INSCRIVEZ-VOUS !</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
