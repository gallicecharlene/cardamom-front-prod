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
      state.list = state.list.concat(action.payload);
    })
    .addCase(fetchCard.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.error.message ?? 'erreur';
    })
    .addCase(cardCreate.fulfilled, (state, action) => {
      state.list = state.list.concat(action.payload);
    });
});

export default cardReducer;
