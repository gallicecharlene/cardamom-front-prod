import './DeckEditor.scss';
import AppHeader from '../AppHeader/AppHeader';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { deleteDeck } from '../../redux/Deck/action';
import {
  fetchCard,
  cardCreate,
  deleteCard,
  updateDeck,
  updateCard,
} from '../../redux/Card/action';
import Cookies from 'js-cookie';
import { LuPencil } from 'react-icons/lu';
import { ImCross } from 'react-icons/im';

function DeckEditor() {
  const { id } = useParams();
  const deckId = parseInt(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const deck = useAppSelector((state) => state.deck.deck);
  const deckList = useAppSelector((state) => state.decks.list);
  const [titleFront, setTitleFrontData] = useState('');
  const [titleBack, setTitleBackData] = useState('');
  const [titleDeck, setDeckTitle] = useState('');
  const token = Cookies.get('jwtToken');
  const navigate = useNavigate();

  // UseEffect pour afficher les cartes
  useEffect(() => {
    if (id) {
      dispatch(fetchCard({ token, deck_id: deckId }));
    }
  }, [token, id]);

  useEffect(() => {
    dispatch({ type: 'deck/UPDATETITLE', payload: deck });
  }, [deck]);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenDeckModal = () => {
    setIsDeckModalOpen(true);
  };

  const handleCloseDeckModal = () => {
    setIsDeckModalOpen(false);
  };
  const cardTitleFrontHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleFrontData(event.target.value);
  };
  const titleDeckHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckTitle(event.target.value);
  };
  const cardTitleBackHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleBackData(event.target.value);
  };

  // Fonction pour créer une carte
  const handleCreateCard = () => {
    setTitleFrontData('');
    setTitleBackData('');
    if (!titleFront) {
      alert('veuillez renseigner un recto');
      return;
    }
    if (!titleBack) {
      alert('veuillez renseigner un verso');
      return;
    }
    dispatch(
      cardCreate({
        title_front: titleFront,
        token,
        title_back: titleBack,
        deck_id: deckId,
      })
    );
    setIsModalOpen(false);
  };

  // Fonction pour supprimer une carte ******** changer le window.confirm par react Toastify
  const handleCardDelete = (index: number) => {
    const card = deck?.flashcards?.[index];
    const confirmDelete = window.confirm(
      'Voulez-vous vraiment supprimer cette carte ?'
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
    if (!titleDeck) {
      alert('veuillez renseigner un nouveau titre');
      return;
    }
    setDeckTitle('');
    handleCloseDeckModal(false);
    dispatch(updateDeck({ token, id: deckId, title: titleDeck }));
  };
  //Fonction pour modifier une carte
  const handleCardUpdate = (index: number) => {
    console.log('coucou', index);
    dispatch(
      updateCard({
        token,
        id: deckId,
        title_back: titleBack,
        title_front: titleFront,
        deck_id: deckId,
      })
    );
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
        <span className="deck-title">{deck.title}</span>

        {isDeckModalOpen ? (
          <>
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
          </>
        ) : (
          <button className="deck-title" onClick={handleOpenDeckModal}>
            <LuPencil />
          </button>
        )}

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
                  value={titleFront}
                  onChange={cardTitleFrontHandleChange}
                />
                <span>Titre verso</span>
                <input
                  className="SearchBar"
                  type="text"
                  id="title"
                  value={titleBack}
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
                <ImCross />
              </button>
              <button onClick={() => handleCardUpdate(index)}>
                <LuPencil />
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
