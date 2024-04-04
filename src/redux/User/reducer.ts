import { createReducer } from '@reduxjs/toolkit';
import { UserState } from '../../types';
import actions from './action';

const initialState: UserState = {
  isConnected: false,
  isRegistered: false,
  errorMessage: '',
  user: {
    email: '',
    password: '',
    pseudo: '',
  },
};

const userReducer = createReducer(initialState, (builder) => {
  builder

    //si authentification est réussie
    .addCase(actions.loginAction.fulfilled, (state, action) => {
      state.isConnected = true;
      state.user = action.payload;
    })
    //si authentifiaction a échoué
    .addCase(actions.loginAction.rejected, (state, action) => {
      state.isConnected = false;
      state.errorMessage = action.error.message || 'erreur';
    })
    //Si inscription réussie
    .addCase(actions.signUpAction.fulfilled, (state, action) => {
      state.isRegistered = true;
    })
    //Si inscription ne réussie pas
    .addCase(actions.signUpAction.rejected, (state, action) => {
      state.isRegistered = false;
      state.errorMessage = action.error.message || `erreur d'inscription`;
    });
});

export default userReducer;
