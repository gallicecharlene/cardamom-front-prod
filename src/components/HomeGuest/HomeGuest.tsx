import AppHeader from '../AppHeader/AppHeader';
import Footer from '../Footer/Footer';
import DeckList from '../DeckList/Deck';
function HomeGuest() {
  return (
    <div className="app">
      <AppHeader children />
      <DeckList />
      <h1>Deconnecter</h1>
      <Footer />
    </div>
  );
}

export default HomeGuest;
