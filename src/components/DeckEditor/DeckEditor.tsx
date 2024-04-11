import './DeckEditor.scss';
import AppHeader from '../AppHeader/AppHeader';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { Card, Deck } from '../../types/index';
import { fetchDeck } from '../../redux/Deck/action';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { deleteDeck } from '../../redux/Deck/action';
import { fetchCard } from '../../redux/Card/action';
import { cardCreate } from '../../redux/Card/action';
import { CardData } from '../../types/index';
function DeckEditor() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const deckList = useAppSelector((state) => state.deck.list);
  const cardList = useAppSelector((state) => state.card.list);
  const [formData, setFormData] = useState<CardData>({ title_front: '' });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateCard = async () => {
    try {
      const response = await dispatch(
        cardCreate({ title_front: formData.title_front })
      );
      const newCard = response.payload;
      setIsModalOpen(false);
      setFormData({ title_front: '' });
    } catch (error) {
      console.error('Erreur lors de la création du deck:', error);
    }
  };

  // Récupére le deck
  useEffect(() => {
    dispatch(fetchDeck());
  }, [dispatch]);

  // Supprimer la carte
  const handleDelete = async (deckId: number) => {
    await dispatch(deleteDeck(deckId));
    window.location.href = '/';
  };
  // Récupére la carte
  useEffect(() => {
    if (id) {
      dispatch(fetchCard(id));
    }
  }, [dispatch, id]);

  console.log('Deck:', deckList);
  console.log('card:', cardList);

  function findDeck(deckList: Deck[], id: number) {
    return deckList.find((deck) => deck.id === id);
  }

  function findCard(cardList: Card[], id: number) {
    return cardList.find((card) => card.deck_id === id);
  }

  const currentDeck = findDeck(deckList, parseInt(id));

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
            <button onClick={handleOpenModal}></button>
          </>
        )}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Votre nouvelle Carte</h2>
              <form>
                <span>Titre</span>
                <input
                  className="SearcBar"
                  type="text"
                  id="title"
                  value={formData.title_front}
                  onChange={(event) =>
                    setFormData({ title_front: event.target.value })
                  }
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
        ;
        {cardList.map((card) => (
          <div key={card.id} className="flashcard">
            <span>{card.title_front}</span> ------
            <span>{card.title_back}</span>
          </div>
        ))}
        <button onClick={() => handleDelete(currentDeck?.id)}>Supprimer</button>
        <Footer />
      </div>
    </main>
  );
}

export default DeckEditor;
