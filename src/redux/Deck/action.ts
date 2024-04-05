import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDeck = createAsyncThunk('decks/FETCH_DECK', async () => {
  const response = await fetch('http://localhost:3003/api/decks');
  const parsedResponse = await response.json();

  const limitedResults = parsedResponse.slice(0, 10);
  console.log(response);
  return limitedResults;
});

export default fetchDeck;
