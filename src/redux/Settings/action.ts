import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { userData } from '../../data';

type LoginActionPayload = {
  email: string;
  password: string;
};

export const loginAction = createAsyncThunk(
  'auth/LOGIN',
  async (payload: LoginActionPayload) => {
    const { email, password } = payload;

    const user = userData.find(
      (user) => user.email === email && user.password === password
    );
  }
);

// Action pour se déconnecter
export const disconnectAction = createAction('auth/DISCONNECT');

// Action pour afficher/cacher le modal de connexion
export const displayModalLogInAction = createAction('auth/DISPLAY_MODAL_LOGIN');
export const hideModalLogInAction = createAction('auth/HIDE_MODAL_LOGIN');

export const displayModalSignUpAction = createAction(
  'auth/DISPLAY_MODAL_SIGNUP'
);
export const hideModalSignUpAction = createAction('auth/HIDE_MODAL_SIGNUP');

export default {
  loginAction,
  disconnectAction,
  displayModalLogInAction,
  hideModalLogInAction,
  displayModalSignUpAction,
  hideModalSignUpAction,
};
