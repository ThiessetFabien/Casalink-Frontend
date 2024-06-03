import { Navigate, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import LandingPage from '../LandingPage/LandingPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Contact from '../Contact/Contact';

import './App.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import HomePage from '../HomePage/HomePage';
import MentionsLegales from '../MentionsLegales/MentionsLegales';
import SiteMap from '../SiteMap/SiteMap';
import NotFount from '../404/404';
import ProfilePage from '../ProfilePage/profilePage';
import SideMenu from '../SideMenu/SideMenu';
import SettingPage from '../SettingPage/SettingPage';
import SelectProfile from '../SelectProfile/SelectProfile';
import {
  getProfileFromLocalStorage,
  getTokenAndPseudoFromLocalStorage,
} from '../../localStorage/localStorage';
import { actionLogin } from '../../store/reducer/user';
import { addTokenJwtToAxiosInstance } from '../../axios/axios';
import { actionSelectProfile } from '../../store/reducer/profile';

function App() {
  const dispatch = useAppDispatch();

  const isLogged = useAppSelector((state) => state.user.logged);
  const memberSelected = useAppSelector(
    (state) => state.profile.memberSelected
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const jwtObject = getTokenAndPseudoFromLocalStorage() as { jwt: string };
    if (jwtObject !== null && jwtObject.jwt !== null) {
      const jwtDecoded = jwtDecode(jwtObject.jwt) as { userId: number };
      addTokenJwtToAxiosInstance(jwtObject.jwt);
      dispatch(actionLogin({ jwt: jwtObject.jwt, id: jwtDecoded.userId }));
      const profile = getProfileFromLocalStorage();

      if (profile !== null) {
        dispatch(actionSelectProfile(profile));
      }
    }
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) return null;

  let homePageElement;
  if (isLogged && memberSelected) {
    homePageElement = <HomePage />;
  } else if (isLogged && !memberSelected) {
    homePageElement = <Navigate to="/selectprofile" />;
  } else {
    homePageElement = <Navigate to="/landingpage" />;
  }
  return (
    <div className="app">
      <Header />
      <div className="mainContainer">
        {isLogged && memberSelected && <SideMenu />}

        <Routes>
          <Route path="/" element={homePageElement} />

          <Route
            path="/setting"
            element={
              isLogged ? <SettingPage /> : <Navigate to="/landingpage" />
            }
          />

          <Route
            path="/foyer"
            element={
              isLogged ? <ProfilePage /> : <Navigate to="/landingpage" />
            }
          />

          <Route
            path="/selectprofile"
            element={
              isLogged ? <SelectProfile /> : <Navigate to="/landingpage" />
            }
          />

          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/sitemap" element={<SiteMap />} />
          <Route path="*" element={<NotFount />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
