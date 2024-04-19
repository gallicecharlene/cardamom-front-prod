import { createReducer, isPending } from '@reduxjs/toolkit';
import { Stats, Deck } from '../../types';
import { updateStats, fetchStatsId } from './action';

type IdCardState = {
  deck: Deck | null;
  stats: Stats | null;
  isPending: boolean;
  error: string | null;
};
const initialState: IdCardState = {
  deck: null,
  stats: null,
  isPending: false,
  error: null,
};

const statsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchStatsId.pending, (state) => {
      state.isPending = true;
      state.error = null;
    })
    .addCase(fetchStatsId.fulfilled, (state, action) => {
      state.isPending = false;
      state.deck = action.payload;
    })
    .addCase(fetchStatsId.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ?? 'erreur';
    })
    .addCase(updateStats.pending, (state) => {
      state.isPending = true;
      state.error = null;
    })
    .addCase(updateStats.fulfilled, (state, action) => {
      state.isPending = false;
      state.stats = action.payload;
      state.deck = action.payload;
    })
    .addCase(updateStats.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ?? 'erreur';
    });
});

export default statsReducer;
