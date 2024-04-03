import logo from '../../assets/logo.svg';
import AppHeader from '../AppHeader/AppHeader';
import SearchBar from '../SearchBar/SearchBar';
import './App.scss';
import Icone from '../Icone/Icone';
import Footer from '../Footer/Footer';
import Deck from '../Deck/Deck';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import memoTest from '../MemoTest/memoTest';

import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <SearchBar />
      <Icone />

      <Deck />
      <Footer />
    </div>
  );
}

export default App;
