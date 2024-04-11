import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

type CardActionPayload = {
  token: string;
  title_front: string;
  title_back: string;
  id: number;
};

export const fetchCard = createAsyncThunk(
  'cards/FETCH_CARDS',
  async (payload: CardActionPayload) => {
    const { token } = payload;
    const response = await fetch(`http://localhost:3003/api/decks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Ajouter le token JWT aux en-têtes
        Authorization: `Bearer ${token}`,
      },
    });
    const parsedResponse = await response.json();
    console.log('reponseeee:', parsedResponse);
    const cardResponse = parsedResponse;
    console.log(cardResponse, 'card response');
    return cardResponse;
  }
);

export const cardCreate = createAsyncThunk(
  'cards/CREATE',
  async (payload: CardActionPayload) => {
    const { token } = payload;
    try {
      const response = await fetch('http://localhost:3003/api/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
