import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { fetchDeck } from '../../redux/Deck/action';
import { Deck } from '../../types';
import './Deck.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Home from '../Home/Home';

function DeckList({ search }) {
  const deck = useAppSelector((state) => state.decks.list);

  const dispatch = useAppDispatch();
  const { list, isPending } = useSelector((state: RootState) => state.decks);
  const token = Cookies.get('jwtToken');

  useEffect(() => {
    if (token) {
      console.log('le useffect pour récupérer les decks se lance');
      dispatch(fetchDeck({ token }));
    }
  }, []);

  if (!deck) {
    return <Home />;
  }
  console.log(list, 'la list dans deck');

  return (
    <div className="deck-container">
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <div>
          {list.map((deck: Deck) => {
            if (
              deck.title
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            ) {
              return (
                <div key={deck.id}>
                  <Link to={`/memoTest/${deck.id}`} className="deck-button">
                    <h2>{deck.title}</h2>
                  </Link>
                  <Link to={`/deckEditor/${deck.id}`} className="modif-button">
                    <i className="fa-solid fa-pen" />
                  </Link>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

export default DeckList;
