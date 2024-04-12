import { createReducer } from '@reduxjs/toolkit';
import { fetchImportDeck } from './action';
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

const importDeckReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchImportDeck.pending, (state) => {
      state.isPending = true;
      state.error = null;
    })
    .addCase(fetchImportDeck.fulfilled, (state, action) => {
      state.isPending = false;
      state.list = state.list.concat(action.payload);
    })
    .addCase(fetchImportDeck.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ?? 'erreur';
    });
});

export default importDeckReducer;
