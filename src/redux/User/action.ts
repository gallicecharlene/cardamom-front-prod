import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface LoginSuccessPayload {
  jwt: string;
  email: string;
  password: string;
  pseudo: string;
}

export const loginAction = createAsyncThunk(
  'auth/LOGIN',
  // J'envoie les informations saisies dans le formulaire de connection à l'API grâce au payload
  async (payload: LoginActionPayload) => {
    const response = await fetch('http://localhost:3003/api/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const filteredResponse = await response.json();
    // récupérer la propriété token qui a été créée par le back et renvoyer dans filteredResponse
    const token = filteredResponse.token;
    console.log(filteredResponse);
    if (token) {
      alert("c'est bon pour le Login");
      // Stocker le token dans les cookies
      Cookies.set('jwtToken', token, { expires: 7 }); // expire dans 7 jours
      return token;
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
    try {
      const response = await fetch('http://localhost:3003/api/auth/signup', {
        method: 'POST',
        headers: {
          // Je précise que j'envoie les données au format JSON
          'Content-Type': 'application/json',
        },
        // J'envoie les données de la liste au format JSON
        body: JSON.stringify(payload),
      });

      const userSend = await response.json();
      console.log(userSend);
      return userSend;
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
