import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDeck = createAsyncThunk('deck/FETCH_DECK', async () => {
  const response = await fetch('https://tyradex.vercel.app/api/v1/pokemon');
  const parsedResponse = await response.json();

  const limitedResults = parsedResponse.slice(0, 10);

  return limitedResults;
});

export default fetchDeck;
