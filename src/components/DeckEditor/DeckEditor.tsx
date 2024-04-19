import './DeckEditor.scss';
import { Link, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
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
  const [isCardUpdateModalOpen, setIsCardUpdateModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState(0);
  const deck = useAppSelector((state) => state.deck.deck);
  const card = useAppSelector((state) => state.deck.deck?.flashcards?.[index]);
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
    setIsCardUpdateModalOpen(false);
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
    const confirmDelete = window.confirm('Voulez vous supprimer ce deck ?');
    if (confirmDelete) {
      dispatch(deleteDeck({ token, id: deckId }));
      navigate('/');
    }
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
  // Fonction qui ouvre la modale updateCard
  const handleCardUpdateModal = (index: number) => {
    setIsCardUpdateModalOpen(true);

    setIndex(index);
  };
  // Fonction qui ferme la modale updateCard
  const handleCloseCardUpdateModal = () => {
    setIsCardUpdateModalOpen(false);
  };
  const handleUpdateCard = (index: number) => {
    const currentIndex = index;
    const cardId = deck?.flashcards?.[currentIndex].id;
    dispatch(
      updateCard({
        token,
        id: cardId,
        title_back: titleBack,
        title_front: titleFront,
        deck_id: deckId,
      })
    );
    setIsCardUpdateModalOpen(false);
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
        <span className="deck-title">{currentDeck?.title}</span>
        {!isModalOpen && (
          <button
            className="creation-button"
            type="button"
            onClick={handleOpenModal}
          >
            {' '}
            <i className="fa-solid fa-square-plus" />
          </button>
        )}

        {isModalOpen ? (
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
        ) : (
          <button onClick={handleOpenModal}>Créer une nouvelle carte</button>
        )}

        {deck.flashcards &&
          deck.flashcards.map((card, index) => (
            <div key={index} className="flashcard">
              <span>{card.title_front}</span> ------
              <span>{card.title_back}</span>
              <button onClick={() => handleCardDelete(index)}>
                <ImCross />
              </button>
              <button onClick={() => handleCardUpdateModal(index)}>
                <LuPencil />
              </button>
            </div>
          ))}
        {isCardUpdateModalOpen && (
          <form>
            <input
              placeholder={card?.title_front}
              className="SearchBar"
              type="text"
              id="title"
              value={titleFront}
              onChange={cardTitleFrontHandleChange}
            />

            <input
              placeholder={card?.title_back}
              className="SearchBar"
              type="text"
              id="title"
              value={titleBack}
              onChange={cardTitleBackHandleChange}
            />
            <button
              className="button-modal"
              type="button"
              onClick={() => handleUpdateCard(index)}
            >
              Valider
            </button>
            <button
              type="button"
              className="button-modal"
              onClick={handleCloseCardUpdateModal}
            >
              ANNULER
            </button>
          </form>
        )}
        <button onClick={handleDeckDelete}>Supprimer</button>
        {cardList.map((card) => (
          <div key={card.id} className="flashcard">
            <span>{card.title_front}</span> affichage deflt Tfront
            <span>{card.title_back}</span> afficahe deflt Tback
          </div>
        ))}
        <Link
          to="/"
          className="authentification-button"
          onClick={() => handleDelete(currentDeck?.id)}
        >
          Supprimer
        </Link>
        <Footer />
      </div>
    </main>
  );
}

export default DeckEditor;
