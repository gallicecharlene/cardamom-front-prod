import './DeckEditor.scss';
import AppHeader from '../AppHeader/AppHeader';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { deleteDeck } from '../../redux/Deck/action';
import { fetchCard, cardCreate, deleteCard } from '../../redux/Card/action';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

function DeckEditor() {
  const { id } = useParams();
  const deckId = parseInt(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const deck = useAppSelector((state) => state.deck.deck);
  const [title_front, setTitle_frontData] = useState('');
  const [title_back, setTitle_backData] = useState('');
  const token = Cookies.get('jwtToken');
  const [isClickDeck, setIsClickDeck] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const cardTitleBackHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle_backData(event.target.value);
  };

  const handleCreateCard = () => {
    setTitle_frontData('');
    setTitle_backData('');
    if (!title_front) {
      toast.error('veuillez renseigner un recto');
      return;
    }
    if (!title_back) {
      toast.error('veuillez renseigner un verso');
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
    toast.success('La carte a bien été ajoutée');
  };
  // fonction pour supprimer une carte

  const handleYesClick = () => {
    if (!isClickDeck) {
      const currentIndex = index;
      console.log(index, 'mon index dans yesclick');
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
  };
  const handleCardDeleteModal = (index: number) => {
    setIndex(index);
    setIsDeleteModalOpen(true);
  };

  // fonction pour supprimer un deck
  const handleDeckDelete = () => {
    setIsDeleteModalOpen(true);
    setIsClickDeck(true);
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

        {deck.flashcards &&
          deck.flashcards.map((card, index) => (
            <div key={index} className="flashcard">
              <span>{card.title_front}</span> ------
              <span>{card.title_back}</span>
              <button onClick={() => handleCardDeleteModal(index)}>
                Supprimer la carte
              </button>
            </div>
          ))}
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
