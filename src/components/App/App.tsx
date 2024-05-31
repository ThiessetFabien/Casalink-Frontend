import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Contact from '../Contact/Contact';

import './App.scss';

import { useAppSelector } from '../../hooks/redux';
import HomePage from '../HomePage/HomePage';
import MentionsLegales from '../MentionsLegales/MentionsLegales';
import SiteMap from '../SiteMap/SiteMap';
import NotFount from '../404/404';
import ProfilePage from '../ProfilePage/profilePage';
import SideMenu from '../SideMenu/SideMenu';
import SettingPage from '../SettingPage/SettingPage';
import SelectProfile from '../SelectProfile/SelectProfile';

function App() {
  const isLogged = useAppSelector((state) => state.user.logged);
  return (
    <div className="app">
      <Header />
      <div className="mainContainer">
        {isLogged && <SideMenu />}

        <Routes>
          <Route
            path="/"
            element={isLogged ? <HomePage /> : <Navigate to="/landingpage" />}
          />

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
          <Route path="/mentionslegales" element={<MentionsLegales />} />
          <Route path="/sitemap" element={<SiteMap />} />
          <Route path="*" element={<NotFount />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
