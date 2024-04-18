import { createReducer, isPending } from '@reduxjs/toolkit';
import { deleteCard, fetchCard, updatedCard } from './action';
import { Card, Deck } from '../../types';
import { cardCreate } from './action';

type IdCardState = {
  deck: Deck | null;
  isPending: boolean;
  error: string | null;
};
const initialState: IdCardState = {
  deck: null,
  isPending: false,
  error: null,
};

const deckReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCard.pending, (state) => {
      state.isPending = true;
      state.error = null;
    })
    .addCase(fetchCard.fulfilled, (state, action) => {
      state.isPending = false;
      state.deck = action.payload;
    })
    .addCase(fetchCard.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ?? 'erreur';
    })
    .addCase(cardCreate.fulfilled, (state, action) => {
      if (state.deck?.flashcards) {
        state.deck.flashcards.push(action.payload);
      }
    })
    .addCase(deleteCard.fulfilled, (state, action) => {
      if (state.deck?.flashcards) {
        const filteredFlashcards: any = state.deck.flashcards.filter(
          (card) => card.id !== action.payload
        );
        state.deck.flashcards = filteredFlashcards;
      }
    })
    .addCase(updatedCard.fulfilled, (state, action) => {
      if (state.deck?.flashcards) {
        state.deck.flashcards = state.deck.flashcards.map((card) =>
          card.id === action.payload.id ? action.payload : card
        );
      }
    });
});

export default deckReducer;
