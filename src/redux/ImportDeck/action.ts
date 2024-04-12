import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDeck } from '../Deck/action';
type DeckImportActionPayload = {
  share_id?: string;
  token: string;
};

export const fetchImportDeck = createAsyncThunk(
  'deck/FETCH_IMPORT_DECK',
  async (payload: DeckImportActionPayload) => {
    const { token } = payload;
    const response = await fetch('http://localhost:3003/api/decks/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const parsedResponse = await response.json();
    const limitedResults = parsedResponse.slice(0, 40);
    return limitedResults;
  }
);

export default fetchImportDeck;
