import { createReducer } from '@reduxjs/toolkit';
import { fetchDeck } from './action';
import { Deck } from '../../types';

type IdDeckState = {
  list: Deck[];
  isPending: boolean;
  error: string | null;
};

const initialState: IdDeckState = {
  list: [],
  isPending: false,
  error: null,
};

const deckReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchDeck.pending, (state) => {
      state.isPending = true;
      state.error = null;
    })
    .addCase(fetchDeck.fulfilled, (state, action) => {
      state.isPending = false;
      state.list = action.payload;
    })
    .addCase(fetchDeck.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ?? 'erreur';
    });
});

export default deckReducer;
