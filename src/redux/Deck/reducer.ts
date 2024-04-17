import { createReducer } from '@reduxjs/toolkit';
import { fetchDeck, updateDeck } from './action';
import { Deck } from '../../types';
import { closeModal, openModal } from './action';
import { deckCreate } from './action';
import { fetchImportDeck } from './action';

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

const deckListReducer = createReducer(initialState, (builder) => {
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
    })
    .addCase(deckCreate.fulfilled, (state, action) => {
      const newDeck = action.payload;

      state.list.push(newDeck);
    })
    .addCase(fetchImportDeck.fulfilled, (state, action) => {
      state.isPending = false;
      state.list.push(action.payload);
    })
    .addCase(updateDeck.fulfilled, (state, action) => {
      const deckUpdate = action.payload;

      const deckToUpdate = state.list.find((deck) => deck.id === deckUpdate.id);
      console.log('mon deck à upadte', deckToUpdate);
      if (deckToUpdate) {
        console.log('mon deck à upadte dans le if', deckToUpdate);
        deckToUpdate.title = deckUpdate.title;
      }
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

export { deckListReducer, modalDeckReducer };
