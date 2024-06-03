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
  builder
    .addCase(fetchStats.fulfilled, (state, action) => {
      state.deck = action.payload;
      console.log(state.deck, 'rentre dans le if');
    })
    .addCase(createStats.fulfilled, (state, action) => {
      console.log('les stats sont créé!!! Youpi ');
      state.deck?.stats_deck.push(action.payload);
      console.log(action.payload, 'les stats sont créé!!! Youpi ');
    });
});
export default statsReducer;
