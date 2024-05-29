import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type CardActionPayload = {
  title_front: string;
  title_back: string;
  deck_id: number;
  id: number | undefined;
};

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchCard = createAsyncThunk(
  'cards/FETCH_CARDS',
  async (payload: CardActionPayload) => {
    const token = Cookies.get('jwtToken');
    const id = payload.deck_id;
    console.log("l'id dans fecthcard est:", id);
    const response = await fetch(`${VITE_API_URL}/api/decks/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Ajouter le token JWT aux en-têtes
        Authorization: `Bearer ${token}`,
      },
    });
    const parsedResponse = await response.json();

    return parsedResponse;
  }
);

export const cardCreate = createAsyncThunk(
  'cards/CREATE',
  async (payload: CardActionPayload) => {
    const token = Cookies.get('jwtToken');
    try {
      const response = await fetch(`${VITE_API_URL}/api/flashcards`, {
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
export const deleteCard = createAsyncThunk(
  'cards/DELETE',
  async (payload: CardActionPayload) => {
    const token = Cookies.get('jwtToken');

    const { id } = payload;
    console.log(id, "l'id de la carte du payload");
    const response = await fetch(`${VITE_API_URL}/api/flashcards/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // const parsedResponse = await response.json();

    return id;
  }
);
export const updateDeck = createAsyncThunk(
  'deck/PATCH',
  async (payload: any) => {
    const { id } = payload;
    const token = Cookies.get('jwtToken');

    const response = await fetch(`${VITE_API_URL}/api/decks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const deckUpdated = await response.json();
    return deckUpdated;
  }
);
export const updateCard = createAsyncThunk(
  'card/PATCH',
  async (payload: CardActionPayload) => {
    const token = Cookies.get('jwtToken');
    const { id } = payload;
    const response = await fetch(`${VITE_API_URL}/api/flashcards/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const cardUpdated = await response.json();
    return cardUpdated;
  }
);

export default { fetchCard, cardCreate, deleteCard, updateDeck, updateCard };
