import AppHeader from '../AppHeader/AppHeader';
import SearchBar from '../SearchBar/SearchBar';
import Icone from '../Icone/Icone';
import Footer from '../Footer/Footer';
import Deck from '../DeckTest/Deck';
import MemoTest from '../MemoTest/MemoTest';
import DeckList from '../DeckList/Deck';
function App() {
  return (
    <div className="app">
      <AppHeader />

      <SearchBar />

      <Icone />

      <DeckList />

      <Footer />
    </div>
  );
}

export default App;
