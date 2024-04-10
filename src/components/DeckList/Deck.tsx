import { useEffect } from 'react';
import { RootState } from '../../redux/store';
import { fetchDeck } from '../../redux/Deck/action';
import { Deck } from '../../types';
import { Link } from 'react-router-dom';
import './Deck.scss';
import { useAppDispatch } from '../../hooks/redux';
import { useSelector } from 'react-redux';

function DeckList() {
  const dispatch = useAppDispatch();
  const { list, isPending } = useSelector((state: RootState) => state.deck);
  useEffect(() => {
    dispatch(fetchDeck());
  }, [dispatch]);

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
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default DeckList;
