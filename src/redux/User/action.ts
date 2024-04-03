import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { userData } from '../../data';

type LoginActionPayload = {
  email: string;
  password: string;
};

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

export default {
  loginAction,
  disconnectAction,
};
