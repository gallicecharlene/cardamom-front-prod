import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
import MemoTest from '../MemoTest/MemoTest';
import { useEffect } from 'react';
import { tokenLoginAction } from '../../redux/User/action';
import Cookies from 'js-cookie';
import HomeGuest from '../HomeGuest/HomeGuest';

function App() {
  // Récupérez le jeton JWT depuis les cookies
  const token = Cookies.get('jwtToken');
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      // Si un jeton est disponible, appelez l'action tokenLoginAction pour effectuer la connexion
      tokenLoginAction();
      console.log('Connexion réussie');

      navigate('/');
    }
  }, [navigate, token]);
  console.log(token, 'console log tout seul');

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={token ? <Home /> : <HomeGuest />} />
        <Route path="/memoTest/:id" element={<MemoTest />} />
      </Routes>
    </div>
  );
}

export default App;
