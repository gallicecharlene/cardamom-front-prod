import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

type CardActionPayload = {
  title_front: string;
};

export const fetchCard = createAsyncThunk(
  'cards/FETCH_CARDS',
  async (deckId: string) => {
    const response = await fetch(`http://localhost:3003/api/decks/${deckId}`);
    const parsedResponse = await response.json();
    console.log('reponseeee:', parsedResponse);
    const cardResponse = parsedResponse.flashcards;
    console.log(cardResponse, 'card response');
    return cardResponse;
  }
);

export const cardCreate = createAsyncThunk(
  'cards/CREATE',
  async (payload: CardActionPayload) => {
    try {
      const response = await fetch('http://localhost:3003/api/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const cardSend = await response.json();
      return cardSend;
    } catch (error) {
      throw error;
    }
  }
);

export default { fetchCard, cardCreate };
