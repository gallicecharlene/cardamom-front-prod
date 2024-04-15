import { useEffect } from 'react';
import { RootState } from '../../redux/store';
import { fetchDeck } from '../../redux/Deck/action';
import { Deck } from '../../types';
import { Link } from 'react-router-dom';
import './Deck.scss';
import { useAppDispatch } from '../../hooks/redux';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

function DeckList() {
  const dispatch = useAppDispatch();
  const { list, isPending } = useSelector((state: RootState) => state.deck);
  const token = Cookies.get('jwtToken');

  useEffect(() => {
    console.log('le useffect pour récupérer les se lance');
    dispatch(fetchDeck({ token }));
  }, []);

  console.log(list);

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
                <Link to={`/deckEditor/${deck.id}`} className="deck-editor">
                  MODIFIE
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default DeckList;
