import LandingPage from '../LandingPage/LandingPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import Contact from '../Contact/Contact';

import './App.scss';
import Login from '../Modals/Login/Login';

function App() {
  return (
    <div className="App">
      <Header />
      <LandingPage />
      <Footer />
      <Login />
    </div>
  );
}

export default App;
