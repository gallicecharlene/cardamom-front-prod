import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { Link, useParams } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Footer from '../Footer/Footer';
import './MemoTest.scss';
import { Deck, Stats } from '../../types/index';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchCard } from '../../redux/Card/action';
import { updateStats, fetchStatsId } from '../../redux/Stats/action';
import Cookies from 'js-cookie';
function MemoTest() {
  const dispatch = useAppDispatch();
  const token = Cookies.get('jwtToken');
  const flashcards = useAppSelector((state) => state.deck.deck?.flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [know, setKnow] = useState(false);
  const statsId = useAppSelector((state) => state.stats.stats?.statsId);
  const userId = useAppSelector((state) => state.stats.stats?.userId);
  const { id } = useParams();
  useEffect(() => {
    if (id && token) {
      console.log('fecthinggg');
      dispatch(fetchCard({ token, deck_id: parseInt(id!) }));
      dispatch(
        fetchStatsId({
          deck_id: parseInt(id!),
          userId: userId ?? '',
          token,
        })
      );
    }
  }, [id, token]);

  console.log('dekkkkk', id);
  const handleKnow = () => {
    setKnow(true);
    dispatch(updateStats({ token, statsId, nb_card_succes: 1 }));
  };

  console.log('stssssss', statsId);

  const handleUnknow = () => {
    setKnow(false);
    dispatch(updateStats({ token, statsId, nb_card_consulted: 1 }));
  };

  function findDeck(deckList: Deck[], id: number) {
    const deck = deckList.find((testedDeck) => {
      return testedDeck.id === id;
    });

    return deck;
  }

  const currentDeck = useAppSelector((state) =>
    findDeck(state.decks.list, parseInt(id!))
  );

  const currentCard = flashcards && flashcards[currentIndex];
  console.log('Current deck:', currentDeck);
  return (
    <main id="deck_page">
      <div className="memo-test">
        <AppHeader>
          <Link to="/" className="return-button">
            ACCUEIL
          </Link>
        </AppHeader>
        <span className="deck-title">{currentDeck?.title}</span>

        {currentCard && (
          <Card
            key={currentCard.id}
            recto={currentCard.title_front}
            verso={currentCard.title_back}
          />
        )}

        <div className="know-button">
          <button className="buttonMemo" onClick={handleUnknow}>
            Je sais pas
          </button>
          <button className="buttonMemo" onClick={handleKnow}>
            Je sais
          </button>
        </div>
        <Footer />
      </div>
    </main>
  );
}

export default MemoTest;
