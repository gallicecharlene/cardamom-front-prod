import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Stats } from '../../types';

type statsActionPayload = {
  userId: string;
  statsId: string;
  nb_card_consulted: number;
  nb_card_succes: number;
  token: string;
  deck_id: number;
};

export const fetchStatsId = createAsyncThunk(
  'stats/FECTHING_STATS',
  async (payload: statsActionPayload) => {
    const { token, statsId, deck_id } = payload;
    console.log('id au niveau des stats', deck_id);
    const response = await fetch(`/api/decks/${deck_id}/stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const parsedResponse = await response.json();
    console.log('fecthing stats ', parsedResponse);
    return parsedResponse;
  }
);

/*export const fetchStatsId = createAsyncThunk(
  'stats/FECTHING_STATS',
  async (payload: statsActionPayload) => {
    const { token, statsId, deck_id } = payload;
    console.log('id au niveau des stats', deck_id);
    const response = await fetch(`/api/decks/${deck_id}/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const parsedResponse = await response.json();
    console.log('fecthing stats ', parsedResponse);
    return parsedResponse;
  }
);
*/
export const updateStats = createAsyncThunk(
  'stats/UPDATE',
  async (payload: statsActionPayload) => {
    const {
      token,
      statsId,
      deck_id,
      nb_card_consulted,
      nb_card_succes,
      userId,
    } = payload;
    console.log('Updating stats1111:', payload);
    console.log('stass', statsId);
    const response = await fetch(`/api/stats/${statsId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nb_card_consulted,
        nb_card_succes,
      }),
    });
    const parsedResponse = await response.json();
    console.log('Updating stats22222:', parsedResponse);

    return parsedResponse;
  }
);

export default { updateStats, fetchStatsId };
