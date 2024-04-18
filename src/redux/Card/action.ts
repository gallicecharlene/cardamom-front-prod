import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

type CardActionPayload = {
  token: string;
  title_front: string;
  title_back: string;
  deck_id: number;
  id: number;
};

export const fetchCard = createAsyncThunk(
  'cards/FETCH_CARDS',
  async (payload: CardActionPayload) => {
    const { token } = payload;
    const id = payload.deck_id;
    console.log("l'id dans fecthcard est:", id);
    const response = await fetch(`http://localhost:3003/api/decks/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Ajouter le token JWT aux en-têtes
        Authorization: `Bearer ${token}`,
      },
    });
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    return parsedResponse;
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
export const deleteCard = createAsyncThunk(
  'cards/DELETE',
  async (payload: CardActionPayload) => {
    const { token } = payload;

    const id = payload.id;
    console.log(id, "l'id de la carte du payload");
    const response = await fetch(`http://localhost:3003/api/flashcards/${id}`, {
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

export const updatedCard = createAsyncThunk(
  'cards/UPDATE',
  async (payload: CardActionPayload) => {
    const { token, title_back, title_front, id, deck_id } = payload;
    const body = { title_back, title_front, deck_id };

    console.log('Données envoyées pour la mise à jour de la carte :', body);

    const response = await fetch(`/api/flashcards/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    console.log('URL de la requête :', `/api/flashcards/${id}`);

    const cardUpdate = await response.json();
    return cardUpdate;
  }
);

export default { fetchCard, cardCreate, deleteCard, updatedCard };
