import { createReducer } from '@reduxjs/toolkit';
import { fetchDeck } from './action';
import { Deck } from '../../types';
import { closeModal, openModal } from './action';
import { deckCreate } from './action';

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

const stateInitial = {
  isModalOpen: false,
};

const deckReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchDeck.pending, (state) => {
      state.isPending = true;
      state.error = null;
    })
    .addCase(fetchDeck.fulfilled, (state, action) => {
      state.isPending = false;
      state.list = state.list.concat(action.payload);
    })
    .addCase(fetchDeck.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ?? 'erreur';
    })
    .addCase(deckCreate.fulfilled, (state, action) => {
      state.list = state.list.concat(action.payload);
    });
});

const modalDeckReducer = createReducer(stateInitial, (builder) => {
  builder
    .addCase(openModal, (state) => {
      state.isModalOpen = true;
    })
    .addCase(closeModal, (state) => {
      state.isModalOpen = false;
    });
});

export { deckReducer, modalDeckReducer };
