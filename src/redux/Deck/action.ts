import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

type DeckActionPayload = {
  title: string;
};

type DeckData = {
  id: number;
  title: string;
  userId?: number;
  shareId?: string;
  createdAt: string;
  updatedAt?: string;
};

export const fetchDeck = createAsyncThunk('decks/FETCH_DECK', async () => {
  const response = await fetch('http://localhost:3003/api/decks');
  const parsedResponse = await response.json();

  const limitedResults = parsedResponse.slice(0, 40);
  console.log(response);
  return limitedResults;
});

export const deckCreate = createAsyncThunk(
  'deck/CREATE',
  async (payload: DeckActionPayload) => {
    try {
      const response = await fetch('http://localhost:3003/api/decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const deckSend = await response.json();
      console.log(deckSend);
      return deckSend;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteDeck = createAsyncThunk(
  'decks/DELETE',
  async (deckId: number) => {
    const response = await fetch(`http://localhost:3003/api/decks/${deckId}`, {
      method: 'DELETE',
    });

    const parsedResponse = await response.json();

    return parsedResponse;
  }
);

export const openModal = createAction('modal/OPEN');
export const closeModal = createAction('modal/CLOSE');

export default {
  fetchDeck,
  openModal,
  closeModal,
  deckCreate,
  deleteDeck,
};
