import { useEffect } from 'react';
import { RootState } from '../../redux/store';
import { fetchDeck } from '../../redux/Deck/action';
import { Deck } from '../../types';
import { Link } from 'react-router-dom';
import './Deck.scss';
import { useAppDispatch } from '../../hooks/redux';
import { useSelector } from 'react-redux';

function DeckList({ deckId }: { deckId: number }) {
  const dispatch = useAppDispatch();
  const { list, isPending } = useSelector((state: RootState) => state.deck);
  useEffect(() => {
    console.log('api en cours');
    dispatch(fetchDeck());
  }, [dispatch]);

  const handleRedirect = (deckId: number) => {
    window.location.href = `/deckEditor/${deckId}`;
  };

  return (
    <div className="deck-container">
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <div>
          {list &&
            list.map((deck: Deck) => (
              <div key={deck.id}>
                <Link to={`/memoTest/${deck.id}`} className="deck-button">
                  <h2>{deck.title}</h2>
                </Link>
                <button
                  className="deck-editor"
                  onClick={() => handleRedirect(deck.id)}
                >
                  MODIFIE
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default DeckList;
