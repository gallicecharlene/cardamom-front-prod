import './DeckEditor.scss';
import AppHeader from '../AppHeader/AppHeader';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { deleteDeck, updateDeck } from '../../redux/Deck/action';
import { fetchCard, cardCreate, deleteCard } from '../../redux/Card/action';
import Cookies from 'js-cookie';

function DeckEditor() {
  const { id } = useParams();
  const deckId = parseInt(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const deck = useAppSelector((state) => state.deck.deck);
  const [title_front, setTitle_frontData] = useState('');
  const [title_back, setTitle_backData] = useState('');
  const [titleDeck, setDeckTitle] = useState('');
  const token = Cookies.get('jwtToken');
  const navigate = useNavigate();

  // UseEffect pour afficher les cartes
  useEffect(() => {
    if (id) {
      dispatch(fetchCard({ token, deck_id: deckId }));
    }
  }, [token, id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const cardTitleFrontHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle_frontData(event.target.value);
  };
  const titleDeckHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckTitle(event.target.value);
  };
  const cardTitleBackHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle_backData(event.target.value);
  };

  // Fonction pour créer une carte
  const handleCreateCard = () => {
    setTitle_frontData('');
    setTitle_backData('');
    if (!title_front) {
      alert('veuillez renseigner un recto');
      return;
    }
    if (!title_back) {
      alert('veuillez renseigner un verso');
      return;
    }
    dispatch(
      cardCreate({
        title_front,
        token,
        title_back,
        deck_id: deckId,
      })
    );
    setIsModalOpen(false);
  };

  // Fonction pour supprimer une carte ******** changer le window.confirm par react Toastify
  const handleCardDelete = (index: number) => {
    const card = deck?.flashcards?.[index];
    const confirmDelete = window.confirm(
      'Voulez-vous vraiment supprmer cette carte ?'
    );
    if (confirmDelete) {
      dispatch(
        deleteCard({
          id: card?.id,
          token,
        })
      );
    }
  };

  // Fonction pour supprimer un deck
  const handleDeckDelete = () => {
    dispatch(deleteDeck({ token, id: deckId }));
    navigate('/');
  };

  //Fonction pour modifier un deck
  const handleDeckUpdate = () => {
    dispatch(updateDeck({ token, id: deckId, title: titleDeck }));
  };
  if (!deck) {
    return;
  }
  return (
    <main id="deck_page">
      <div className="deck-editor">
        <AppHeader>
          <Link to="/" className="return-button">
            ACCUEIL
          </Link>
        </AppHeader>
        <input
          type="text"
          placeholder={deck.title}
          className="deck-title"
          onChange={titleDeckHandleChange}
        />
        <button
          className="deck-title"
          value={titleDeck}
          onClick={handleDeckUpdate}
        >
          Changer le titre du deck
        </button>
        {!isModalOpen && (
          <button onClick={handleOpenModal}>Créer une nouvelle carte</button>
        )}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Votre nouvelle Carte</h2>
              <form>
                <span>Titre recto</span>
                <input
                  className="SearchBar"
                  type="text"
                  id="title"
                  value={title_front}
                  onChange={cardTitleFrontHandleChange}
                />
                <span>Titre verso</span>
                <input
                  className="SearchBar"
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

        {deck.flashcards &&
          deck.flashcards.map((card, index) => (
            <div key={index} className="flashcard">
              <span>{card.title_front}</span> ------
              <span>{card.title_back}</span>
              <button onClick={() => handleCardDelete(index)}>
                Supprimer la carte
              </button>
            </div>
          ))}
        <button onClick={handleDeckDelete}>Supprimer</button>
        <Footer />
      </div>
    </main>
  );
}

export default DeckEditor;
