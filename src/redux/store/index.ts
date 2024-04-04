import { configureStore } from '@reduxjs/toolkit';
import settings from '../Settings';
import user from '../User';

const store = configureStore({
  reducer: {
    settings: settings.reducer, // Reducer des settings (modales connection inscription)
    user: user.reducer,
  },
  devTools: true, // Mettre devTools sur true permet d'activer l'utilisation de l'extension chrome/firefox REDUX
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
