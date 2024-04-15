import { createReducer, isPending } from '@reduxjs/toolkit';
import { fetchCard } from './action';
import { Card } from '../../types';
import { cardCreate } from './action';

type IdCardState = {
  list: Card[];
  isPending: boolean;
  error: string | null;
};
const initialState: IdCardState = {
  list: [],
  isPending: false,
  error: null,
};

const cardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCard.pending, (state) => {
      state.isPending = true;
      state.error = null;
    })
    .addCase(fetchCard.fulfilled, (state, action) => {
      state.isPending = false;
      state.list = action.payload;
    })
    .addCase(fetchCard.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ?? 'erreur';
    })
    .addCase(cardCreate.fulfilled, (state, action) => {
      const newCard = action.payload;
      if (!state.list.some((card) => card.id === newCard.id)) {
        state.list.push(newCard);
      }
    });
});

export default cardReducer;
