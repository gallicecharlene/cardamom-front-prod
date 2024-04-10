import './DeckEditor.scss';
import AppHeader from '../AppHeader/AppHeader';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { Deck } from '../../types/index';
import { fetchDeck } from '../../redux/Deck/action';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { deleteDeck } from '../../redux/Deck/action';

function DeckEditor() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const deckList = useAppSelector((state) => state.deck.list);

  useEffect(() => {
    dispatch(fetchDeck());
  }, [dispatch]);
  const handleDelete = async (deckId: number) => {
    await dispatch(deleteDeck(deckId));
    window.location.href = '/';
  };

  console.log('Deck:', deckList);

  function findDeck(deckList: Deck[], id: number) {
    return deckList.find((deck) => deck.id === parseInt(id));
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
        <button onClick={() => handleDelete(currentDeck?.id)}>Supprimer</button>

        <Footer />
      </div>
    </main>
  );
}

export default DeckEditor;
