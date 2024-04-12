import './DeckEditor.scss';
import AppHeader from '../AppHeader/AppHeader';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { Card, Deck } from '../../types/index';
import { fetchDeck } from '../../redux/Deck/action';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { deleteDeck } from '../../redux/Deck/action';
import { fetchCard } from '../../redux/Card/action';
import { cardCreate } from '../../redux/Card/action';
import Cookies from 'js-cookie';

function DeckEditor() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const deckList = useAppSelector((state) => state.deck.list);
  const cardList = useAppSelector((state) => state.card.list);
  const [title_front, setTitle_frontData] = useState('');
  const [title_back, setTitle_backData] = useState('');
  const token = Cookies.get('jwtToken');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const cardTitleFrontHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle_frontData(event.target.value);
  };
  const cardTitleBackHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle_backData(event.target.value);
  };
  const handleCreateCard = async () => {
    setTitle_frontData('');
    setTitle_backData('');
    try {
      dispatch(
        cardCreate({
          title_front,
          token,
          title_back,
          deck_id: currentDeck?.id,
        })
      );

      setIsModalOpen(false);
      setTitle_frontData('');
    } catch (error) {
      console.error('Erreur lors de la création du deck:', error);
    }
  };
  function findDeck(deckList: Deck[], id: number) {
    return deckList.find((deck) => deck.id === id);
  }

  const currentDeck = findDeck(deckList, parseInt(id as string));
  const deck_id = currentDeck?.id;
  // Récupére le deck
  useEffect(() => {
    dispatch(fetchDeck({ token }));
  }, [dispatch]);

  // Supprimer la carte
  const handleDelete = async (id: number) => {
    await dispatch(deleteDeck(id));
  };
  // Récupére la carte
  useEffect(() => {
    if (id) {
      dispatch(fetchCard({ token, deck_id }));
    }
  }, [dispatch, token]);
  function findCard(cardList: Card[], id: number) {
    return cardList.find((card) => card.deck_id === id);
  }

  console.log('card:', cardList);

  console.log('Deck en cours:', currentDeck);

  return (
    <main id="deck_page">
      <div className="deck-editor">
        <AppHeader>
          <Link to="/" className="return-button">
            ACCUEIL
          </Link>
        </AppHeader>
        <span className="deck-title">{currentDeck?.title}</span>
        {!isModalOpen && (
          <>
            <button onClick={handleOpenModal}>Créer une nouvelle carte</button>
          </>
        )}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Votre nouvelle Carte</h2>
              <form>
                <span>Titre recto</span>
                <input
                  className="SearcBar"
                  type="text"
                  id="title"
                  value={title_front}
                  onChange={cardTitleFrontHandleChange}
                />
                <span>Titre verso</span>
                <input
                  className="SearcBar"
                  type="text"
                  id="title"
                  value={title_back}
                  onChange={cardTitleBackHandleChange}
                />
                <button
                  className="button-modal"
                  type="button"
                  onClick={handleCreateCard}
                >
                  Créer
                </button>
                <button
                  className="button-modal"
                  type="button"
                  onClick={handleCloseModal}
                >
                  Annuler
                </button>
              </form>
            </div>
          </div>
        )}

        {cardList.map((card) => (
          <div key={card.id} className="flashcard">
            <>
              <span>{card.title_front}</span> ------
              <span>{card.title_back}</span>le titleback est sini
            </>
          </div>
        ))}
        <Link to="/" onClick={() => handleDelete(currentDeck?.id)}>
          Supprimer
        </Link>
        <Footer />
      </div>
    </main>
  );
}

export default DeckEditor;
