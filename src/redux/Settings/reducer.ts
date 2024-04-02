import { createReducer } from '@reduxjs/toolkit';
import { SettingsState } from '../../types';
import actions from './action';

const initialState: SettingsState = {
  displayModalLogIn: false,
  displayModalSignUp: false,

  isConnected: false,
  errorMessage: '',
};

const settingsReducer = createReducer(initialState, (builder) => {
  builder
    //cacher la modale
    .addCase(actions.hideModalLogInAction, (state, action) => {
      state.displayModalLogIn = false;
    })
    .addCase(actions.hideModalSignUpAction, (state, action) => {
      state.displayModalSignUp = false;
    })
    //afficher la modale
    .addCase(actions.displayModalLogInAction, (state, action) => {
      state.displayModalLogIn = true;
    })
    .addCase(actions.displayModalSignUpAction, (state, action) => {
      state.displayModalSignUp = true;
    });
  //si authentification est réussie
  /* .addCase(actions.loginAction.fulfilled, (state, action) => {
      state.isConnected = true;
      state.displayModal = false;
    })
    //si authentifiaction a échoué
    .addCase(actions.loginAction.rejected, (state, action) => {
      state.isConnected = false;
      state.displayModal = true;
      state.errorMessage = action.error.message || 'erreur';
    });
    */
});

export default settingsReducer;
