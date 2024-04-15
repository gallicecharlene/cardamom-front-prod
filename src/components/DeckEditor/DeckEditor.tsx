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
import { fetchCard, cardCreate } from '../../redux/Card/action';
import Cookies from 'js-cookie';

function DeckEditor() {
  const { id } = useParams();
  const deckId = parseInt(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const deckList = useAppSelector((state) => state.deck.list);
  const cardList = useAppSelector((state) => state.card.list);
  const [title_front, setTitle_frontData] = useState('');
  const [title_back, setTitle_backData] = useState('');
  const token = Cookies.get('jwtToken');

  useEffect(() => {
    dispatch(fetchDeck({ token }));
    if (id) {
      dispatch(fetchCard({ token, deck_id: deckId }));
    }
  }, [dispatch, token, id]);

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

    await dispatch(
      cardCreate({
        title_front,
        token,
        title_back,
        deck_id: deckId,
      })
    );
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteDeck(id));
  };

  return (
    <main id="deck_page">
      <div className="deck-editor">
        <AppHeader>
          <Link to="/" className="return-button">
            ACCUEIL
          </Link>
        </AppHeader>
        <span className="deck-title">
          {deckList.find((deck) => deck.id === parseInt(id))?.title}
        </span>
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

        {cardList.map((card, id) => (
          <div key={id} className="flashcard">
            <span>{card.title_front}</span> ------
            <span>{card.title_back}</span>
          </div>
        ))}
        <Link to="/" onClick={() => handleDelete(id)}>
          Supprimer
        </Link>
        <Footer />
      </div>
    </main>
  );
}

export default DeckEditor;
