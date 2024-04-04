import DeckList from '../DeckList/Deck';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchDeck from '../../redux/Deck/action';

const useDeckFetch = () => {
  const dispatch: AppDispatch = useDispatch();
  const deck = useSelector((store: RootState) => store.deck);
  useEffect(() => {
    if (!deck.list) {
      dispatch(fetchDeck());
    }
  }, []);
};

export default useDeckFetch;
