import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

interface LoginSuccessPayload {
  jwt: string;
  email: string;
  password: string;
  pseudo: string;
}

export const loginAction = createAsyncThunk(
  'auth/LOGIN_JWT',
  async (payload: { email: string; password: string }) => {
    try {
      const response = await fetch('http://localhost:3003/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('JWT :', data.token);

      if (!data) {
        throw new Error('Pas bon');
      }

      return data.token;
    } catch (error) {
      console.error('erreur co:', error);
      throw error;
    }
  }
);

export const signUpAction = createAsyncThunk(
  'auth/SIGNUP_JWT',
  async (payload: { email: string; password: string; pseudo: string }) => {
    const response = await fetch('http://localhost:3003/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  }
);

export default {
  loginAction,
  signUpAction,
};
