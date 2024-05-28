import { createReducer } from '@reduxjs/toolkit';
import { createStats, fetchStats } from './action';
import { Deck } from '../../types';

type StatsState = {
  deck: Deck | null;
  error: string | null;
};

const initialState: StatsState = {
  deck: null,
  error: null,
};

const statsReducer = createReducer(initialState, (builder) => {
  builder.addCase(createStats.fulfilled, (state, action) => {
    // dans le cas ou  createStats on ça a fonctionné
    if (state.deck?.stats_deck) {
      state.deck.stats_deck.push(action.payload);
      console.log('les stats sont créé!!! Youpi ');
    }
  });
});
export default statsReducer;
