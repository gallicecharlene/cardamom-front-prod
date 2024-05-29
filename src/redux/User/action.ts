import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Deck, Stats } from '../../types';

type LoginActionPayload = {
  id: number | undefined;
  email: string | undefined;
  password: string;
  pseudo: string | undefined;
  decks: Deck[];
  stats: Stats[];
};
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Action pour se connecter
export const loginAction = createAsyncThunk(
  'auth/LOGIN',
  // J'envoie les informations saisies dans le formulaire de connection à l'API grâce au payload
  async (payload: LoginActionPayload) => {
    const response = await fetch(`${VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const filteredResponse = await response.json();
    // récupérer la propriété token qui a été créée par le back et renvoyer dans filteredResponse
    const { token } = filteredResponse;

    if (token) {
      toast.success('Connection réussie');
      // Stocker le token dans les cookies
      Cookies.set('jwtToken', token, { expires: 1 }); // expire dans 7 jours
      return filteredResponse;
    }
    toast.error('Votre identifiant ou mot de passe sont incorrects');
  }
);
// Action pour se connecter si il y a un token
export const tokenLoginAction = createAsyncThunk(
  'auth/PROFILE',
  // J'envoie les informations saisies dans le formulaire de connection à l'API grâce au payload
  async (payload: LoginActionPayload) => {
    const token = Cookies.get('jwtToken');

    // message d'erreur si pas de token
    if (!token) {
      throw new Error('No token available');
    }
    try {
      const response = await fetch(`${VITE_API_URL}/api/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Ajouter le token JWT aux en-têtes
          Authorization: `Bearer ${token}`,
        },
      });
      // Gérer le cas où l'authentification échoue
      if (!response.ok) {
        Cookies.remove('jwtToken');
        throw new Error('Failed to authenticate');
      }

      const userData = await response.json();

      toast.success('Connection réussie');
      return userData;
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la connexion');
      throw error; // Propager l'erreur pour que le thunk puisse la capturer
    }
  }
);
//Action mettre à jour le user
export const updateUser = createAsyncThunk(
  'auth/PATCH',
  async (payload: LoginActionPayload) => {
    const token = Cookies.get('jwtToken');
    console.log(token, 'le token');
    const response = await fetch(`${VITE_API_URL}/api/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const profileUpdated = await response.json();
    return profileUpdated;
  }
);

export const deleteUser = createAsyncThunk('auth/DELETE', async () => {
  const token = Cookies.get('jwtToken');
  const response = await fetch(`${VITE_API_URL}/api/profile`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const profileUpdated = await response.json();
  return profileUpdated;
});
// Action pour se déconnecter
export const disconnectAction = createAction('auth/DISCONNECT');

// Action pour s'inscrire
export const signUpAction = createAsyncThunk(
  'auth/SIGNUP',
  async (payload: LoginActionPayload) => {
    const response = await fetch(`${VITE_API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        // Je précise que j'envoie les données au format JSON
        'Content-Type': 'application/json',
      },
      // J'envoie les données de la liste au format JSON
      body: JSON.stringify(payload),
    });

    const userSend = await response.json();

    return userSend;
  }
);
export default {
  loginAction,
  disconnectAction,
  signUpAction,
  tokenLoginAction,
  updateUser,
  deleteUser,
};
