import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

type DeckActionPayload = {
  title: string;
  id: number;
  user_id?: number;
  shareId?: string;
  created_at: string;
  updated_at?: string;
  token: string;
};

export const fetchDeck = createAsyncThunk(
  'decks/FETCH_DECK',
  async (payload: DeckActionPayload) => {
    const { token } = payload;
    const response = await fetch('http://localhost:3003/api/decks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const parsedResponse = await response.json();

    return parsedResponse;
  }
);

export const deckCreate = createAsyncThunk(
  'deck/CREATE',
  async (payload: DeckActionPayload) => {
    const { token } = payload;
    try {
      const response = await fetch('http://localhost:3003/api/decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const deckSend = await response.json();

      return deckSend;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteDeck = createAsyncThunk(
  'decks/DELETE',
  async (payload: DeckActionPayload) => {
    const response = await fetch(
      `http://localhost:3003/api/decks/${payload.id}`,
      {
        method: 'DELETE',
      }
    );

    const parsedResponse = await response.json();

    return parsedResponse;
  }
);

export const fetchImportDeck = createAsyncThunk(
  'deck/FETCH_IMPORT_DECK',
  async (payload: DeckActionPayload) => {
    const { shareId, token } = payload;
    console.log(shareId);
    console.log(token);

    const response = await fetch(
      `http://localhost:3003/api/decks/share/${shareId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const parsedResponse = await response.json();
    console.log(parsedResponse, 'parsed response');
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
  fetchImportDeck,
};
