import { useState } from 'react';
import Card from '../Card/Card';
import { Link, useParams } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Footer from '../Footer/Footer';
import './MemoTest.scss';
import deck from '../../redux/Deck/';
import useDeckFetch from './useDeckFetch';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Deck } from '../../types/index';
import { useAppSelector } from '../../hooks/redux';

function MemoTest() {
  const [know, setKnow] = useState(false);
  const handleKnow = () => {
    setKnow(true);
  };

  const handleUnknow = () => {
    setKnow(false);
  };
  /*
  const deck = useSelector((state: RootState) => state.deck);

  const deckPage = () => {
    const { deckId } = useParams();
    useDeckFetch();
    //const { isPending } = useSelector((store: RootState) => store.deck);
    const deck = useSelector((store: RootState) =>
      store.deck.list?.find(
        (deck: Deck) =>
          deck.pokedex_id === parseInt(useParams().deckId as string)
      )
    );
  };
*/

  function findDeck(deckList: Deck[], deckId: number): Deck | undefined {
    console.log(deckList);
    return deckList.find((deck) => deck.pokedex_id === deckId);
  }
  const { deckId } = useParams();
  const deck = useAppSelector((state) =>
    findDeck(state.deck.list, parseInt(deckId!))
  );
  console.log(deck);
  return (
    <main id="deck_page">
      <div className="memo-test">
        <AppHeader>
          <Link to="/" className="return-button">
            ACCUEIL
          </Link>
          {deck?.category}
        </AppHeader>
        <Card recto="recto" verso="verso" />
        <div className="know-button">
          <button className="button" onClick={handleUnknow}>
            Je sais pas
          </button>
          <button className="button" onClick={handleKnow}>
            Je sais
          </button>
        </div>
        <Footer />
      </div>
    </main>
  );
}

export default MemoTest;
