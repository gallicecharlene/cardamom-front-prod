import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../Card/Card';
import AppHeader from '../AppHeader/AppHeader';
import Footer from '../Footer/Footer';
import './MemoTest.scss';
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

  const { id } = useParams();

  function findDeck(deckList: Deck[], id: number) {
    const deck = deckList.find((testedDeck) => {
      return testedDeck.id === id;
    });

    return deck;
  }

  const currentDeck = useAppSelector((state) =>
    findDeck(state.decks.list, parseInt(id!))
  );

  return (
    <main id="deck_page">
      <div className="memo-test">
        <AppHeader>
          <Link to="/" className="return-button">
            ACCUEIL
          </Link>
        </AppHeader>
        <span className="deck-title">{currentDeck?.title}</span>

        <Card recto="recto" verso="verso" />
        <div className="know-button">
          <button className="buttonMemo" onClick={handleUnknow}>
            A revoir
          </button>
          <button className="buttonMemo" onClick={handleKnow}>
            Aller next!
          </button>
        </div>
        <Footer />
      </div>
    </main>
  );
}

export default MemoTest;
