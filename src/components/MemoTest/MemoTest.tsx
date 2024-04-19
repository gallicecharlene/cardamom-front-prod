import { useEffect, useState } from 'react';
import Card from '../Card/Card';
=========
>>>>>>>>> Temporary merge branch 2
import { Link, useParams } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Footer from '../Footer/Footer';
import './MemoTest.scss';
import { Deck } from '../../types/index';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchCard } from '../../redux/Card/action';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

function MemoTest() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = Cookies.get('jwtToken');
  const flashcards = useAppSelector((state) => state.deck.deck?.flashcards);
  const [know, setKnow] = useState(false);
  const [currentCardMemo, setCurrentCardMemo] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();

  const handleRestartSession = () => {
    setCurrentCardMemo(0);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };
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

  useEffect(() => {
    if (flashcards && currentCardMemo >= flashcards.length) {
      setIsModalOpen(true);
    }
  }, [currentCardMemo, flashcards]);

  const handleKnow = () => {
    setKnow(true);
    setCurrentCardMemo(currentCardMemo + 1);
  };

  const handleUnknow = () => {
    setKnow(false);
    setCurrentCardMemo(currentCardMemo + 1);
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

  const currentCard = flashcards && flashcards[currentCardMemo];

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
            A revoir
          </button>
          <button className="buttonMemo" onClick={handleKnow}>
            Aller next!
          </button>
        </div>
        <Footer />
      </div>
      {isModalOpen && (
        <div className="modal-Memo">
          <div className="modal-content">
            <p>Session terminée. Voulez-vous recommencer ?</p>
            <button onClick={handleRestartSession}>Oui</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default MemoTest;
