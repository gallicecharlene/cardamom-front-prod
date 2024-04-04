import { configureStore } from '@reduxjs/toolkit';
import settings from '../Settings';
import settingsReducer from '../Settings';
import deckReducer from '../Deck/reducer';
import deck from '../Deck';

const store = configureStore({
  reducer: {
    settings: settings.reducer, // Reducer des settings (gestion des utilisateur / connexion)
    deck: deckReducer,
  },
  devTools: true, // Mettre devTools sur true permet d'activer l'utilisation de l'extension chrome/firefox REDUX
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
