import { createReducer } from '@reduxjs/toolkit';
import { UserState } from '../../types';
import actions from './action';

const initialState: UserState = {
  isConnected: false,
  errorMessage: '',
};

const userReducer = createReducer(initialState, (builder) => {
  builder

    //si authentification est réussie
    .addCase(actions.loginAction.fulfilled, (state, action) => {
      state.isConnected = true;
    })
    //si authentifiaction a échoué
    .addCase(actions.loginAction.rejected, (state, action) => {
      state.isConnected = false;
      state.errorMessage = action.error.message || 'erreur';
    });
});

export default userReducer;
