import AppHeader from '../AppHeader/AppHeader';
import SearchBar from '../SearchBar/SearchBar';
import Icone from '../Icone/Icone';
import Footer from '../Footer/Footer';
import DeckList from '../DeckList/Deck';
import HomeGuest from '../HomeGuest/HomeGuest';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
function Home() {
  const isConnected = useSelector((store: RootState) => store.user.isConnected);
  console.log(isConnected, 'home');
  return (
    <>
      {isConnected && (
        <div className="app">
          <AppHeader children />

          <SearchBar />

          <Icone />

          <DeckList />

          <Footer />
        </div>
      )}
      {!isConnected && <HomeGuest />}
    </>
  );
}

export default Home;
