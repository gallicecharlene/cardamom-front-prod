import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
import MemoTest from '../MemoTest/MemoTest';
import { useEffect } from 'react';
import { tokenLoginAction } from '../../redux/User/action';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../../hooks/redux';
import DeckEditor from '../DeckEditor/DeckEditor';

function App() {
  // Récupérez le jeton JWT depuis les cookies
  const token = Cookies.get('jwtToken');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      // Si un jeton est disponible, appelez l'action tokenLoginAction pour effectuer la connexion
      dispatch(
        tokenLoginAction({
          token,
          email: '',
          password: '',
          pseudo: '',
        })
      );
      console.log('Connexion réussie');
    }
  }, [token]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memoTest/:id" element={<MemoTest />} />
        <Route path="/deckEditor/:id" element={<DeckEditor />} />
      </Routes>
    </div>
  );
}

export default App;
