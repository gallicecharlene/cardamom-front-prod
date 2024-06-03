import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { Deck } from '../../types';

type StatsActionPayload = {
  nb_card_consulted: number;
  nb_card_success: number;
  deck_id: number;
  stats_id: number | undefined;
};
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchStats = createAsyncThunk(
  'stats/FETCH_STATS',
  async (payload: StatsActionPayload) => {
    const token = Cookies.get('jwtToken');


    const response = await fetch(`${VITE_API_URL}/api/`, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(payload),
    });
    const statsSend = await response.json();
    return statsSend;
  }
);
export const createStats = createAsyncThunk(
  'stats/POST',
  async (payload: any) => {
    const { deck_id } = payload;
    const token = Cookies.get('jwtToken');
    const response = await fetch(`${VITE_API_URL}/api/decks/${deck_id}/stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const statsCreated = await response.json();
    return statsCreated;
  }
);

export default { fetchStats, createStats };
