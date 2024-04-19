import './DeckEditor.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Footer from '../Footer/Footer';
import { useAppSelector } from '../../hooks/redux';
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
import { toast } from 'react-toastify';

function DeckEditor() {
  const { id } = useParams();
  const deckId = parseInt(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const [isCardUpdateModalOpen, setIsCardUpdateModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const deck = useAppSelector((state) => state.deck.deck);
  const card = useAppSelector((state) => state.deck.deck?.flashcards?.[index]);
  const [titleFront, setTitleFrontData] = useState('');
  const [titleBack, setTitleBackData] = useState('');
  const [titleDeck, setDeckTitle] = useState('');
  const token = Cookies.get('jwtToken');
  const [isClickDeck, setIsClickDeck] = useState(false);
  const navigate = useNavigate();
  const userIdDeck = useAppSelector((state) => state.deck.deck?.user_id);
  const userId = useAppSelector((state) => state.user.user?.id);
  const [isNotItSameid, setIsItNotSameId] = useState(false);
  const shareId = useAppSelector((state) => state.deck.deck?.share_id);

  // UseEffect pour afficher les cartes
  useEffect(() => {
    if (id) {
      dispatch(fetchCard({ token, deck_id: deckId }));
    }
  }, [token, id]);
  useEffect(() => {
    if (deckId) {
      checkId();
    }
  }, [deckId]);
  console.log(isNotItSameid, 'is not same id ?');

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
  // Fonction pour comparer l'id de l'utilisateur et l'user_id du deck
  const checkId = () => {
    console.log(userIdDeck, 'userid du deck');
    console.log(userId, 'id utilisateur');
    if (userIdDeck !== userId) {
      setIsItNotSameId(true);
    }
  };

  // Fonction pour créer une carte
  const handleCreateCard = () => {
    setTitleFrontData('');
    setTitleBackData('');
    if (!titleFront) {
      toast.error('Veuillez renseigner un recto');
      return;
    }
    if (!titleBack) {
      toast.error('Veuillez renseigner un verso');
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
    toast.success('La carte a bien été ajoutée');
  };
  // fonction pour supprimer une carte

  const handleYesClick = () => {
    console.log(isClickDeck, 'mon index dans yesclick');
    if (!isClickDeck) {
      const currentIndex = index;
      console.log(isClickDeck, 'mon index dans yesclick');
      const card = deck?.flashcards?.[currentIndex];
      console.log(card, 'mon card dans yesclick');
      dispatch(
        deleteCard({
          id: card?.id,
          token,
        })
      );
    }
    if (isClickDeck) {
      dispatch(deleteDeck({ token, id: deckId }));
      navigate('/');
    }
    setIsDeleteModalOpen(false);
    toast.success("L'élément a bien été supprimé");
  };
  const handleCardDeleteModal = (index: number) => {
    setIndex(index);
    setIsDeleteModalOpen(true);
  };

  // Fonction pour supprimer un deck
  const handleDeckDelete = () => {
    setIsDeleteModalOpen(true);
    setIsClickDeck(true);
  };

  //Fonction pour modifier un deck

  const handleDeckUpdate = () => {
    if (!titleDeck) {
      toast.error('Veuillez renseigner un nouveau titre');
      return;
    }
    setDeckTitle('');
    handleCloseDeckModal(false);
    dispatch(updateDeck({ token, id: deckId, title: titleDeck }));
    toast.success('Le titre a bien été modifié');
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
    toast.success('La flashcard a bien été modifiée');
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
        ) : isNotItSameid ? (
          <>
            <button className="deck-title" onClick={handleOpenDeckModal}>
              <LuPencil />
            </button>
          </>
        ) : (
          ''
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
          <button className="creation-button" onClick={handleOpenModal}>
            <i className="fa-solid fa-square-plus" />
          </button>
        )}

        {deck.flashcards &&
          deck.flashcards.map((card, index) => (
            <div key={index} className="flashcard">
              <span>{card.title_front} </span>
              <span> {card.title_back}</span>
              <button onClick={() => handleCardDeleteModal(index)}>
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
        {isDeleteModalOpen &&
          toast(
            <div>
              <h3>
                Voulez-vous VRAIMENT supprimer cet élément ?
                <button onClick={handleYesClick}> Oui</button>
              </h3>
            </div>
          )}
        <button onClick={handleDeckDelete}>Supprimer</button>
        <Footer />
      </div>
    </main>
  );
}

export default DeckEditor;
