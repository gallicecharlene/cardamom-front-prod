import { configureStore } from '@reduxjs/toolkit';
import settings from '../Settings';
import user from '../User';
import { deckReducer } from '../Deck/reducer';
import { modalDeckReducer } from '../Deck/reducer';
import cardReducer from '../Card/reducer';
import importDeckReducer from '../ImportDeck/reducer';
const store = configureStore({
  reducer: {
    settings: settings.reducer, // Reducer des settings (gestion de la modale pour inscription / connexion)
    deck: deckReducer,
    modalDeck: modalDeckReducer,
    user: user.reducer, // Reducer pour la gestion de l'utilisateur
    card: cardReducer,
    import: importDeckReducer,
  },
  devTools: true, // Mettre devTools sur true permet d'activer l'utilisation de l'extension chrome/firefox REDUX
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
