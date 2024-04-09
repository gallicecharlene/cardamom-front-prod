import AppHeader from '../AppHeader/AppHeader';
import SearchBar from '../SearchBar/SearchBar';
import Icone from '../Icone/Icone';
import Footer from '../Footer/Footer';
import DeckList from '../DeckList/Deck';
function App() {
  return (
    <div className="app">
      <AppHeader children={undefined} />

      <SearchBar />

      <Icone />

      <DeckList />

      <Footer />
    </div>
  );
}

export default App;
