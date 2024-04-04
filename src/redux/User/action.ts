import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { userData } from '../../data';

type LoginActionPayload = {
  email: string;
  password: string;
  pseudo: String;
};
// Action pour se connecter
export const loginAction = createAsyncThunk(
  'auth/LOGIN',
  async (payload: LoginActionPayload) => {
    const users = userData;

    const user = users.find(
      (user) =>
        user.email === payload.email && user.password === payload.password
    );
    if (user) {
      alert("c'est bon pour le Login");
      return user;
    } else {
      alert('pas bon');
    }
  }
);

// Action pour se déconnecter
export const disconnectAction = createAction('auth/DISCONNECT');

// Action pour s'inscrire

export const signUpAction = createAsyncThunk(
  'auth/SIGNUP',
  async (payload: LoginActionPayload) => {
    const user = userData;
    try {
      // Remplacer api avec la vrai api
      // await api.register(userData);
      console.log(
        payload.email,
        payload.password,
        payload.pseudo,
        'api réussi'
      );
      return user;
    } catch (error) {
      throw error;
    }
  }
);

export default {
  loginAction,
  disconnectAction,
  signUpAction,
};
