import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from '../LandingPage/LandingPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Contact from '../Contact/Contact';

import './App.scss';
import { useAppSelector } from '../../hooks/redux';
import HomePage from '../HomePage/HomePage';

function App() {
  const islLogged = useAppSelector((state) => state.user.logged);
  console.log(`is logged: ${islLogged}`);
  return (
    <div className="App">
      <Header />
      <Routes>
        {islLogged ? (
          <Route path="/" element={<HomePage />} />
        ) : (
          <Route path="/" element={<LandingPage />} />
        )}
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
