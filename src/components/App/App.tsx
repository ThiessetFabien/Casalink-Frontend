import LandingPage from '../LandingPage/LandingPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import Contact from '../Contact/Contact';

import './App.scss';
import Login from '../Modals/Login/Login';
import { useAppSelector } from '../../hooks/redux';

function App() {
  const loginModalIsOpen = useAppSelector(
    (state) => state.modal.loginModalIsOpen
  );
  console.log(loginModalIsOpen);
  return (
    <div className="App">
      <Header />
      <LandingPage />
      <Footer />
      {loginModalIsOpen && <Login loginIsOpen={loginModalIsOpen} />}
    </div>
  );
}

export default App;
