import { createReducer } from '@reduxjs/toolkit';
import { loginAction, signUpAction } from './action';
interface AuthState {
  isAuth: boolean;
  jwt: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuth: false,
  jwt: null,
  error: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginAction.fulfilled, (state, action) => {
      state.isAuth = true;
      state.jwt = action.payload;
      console.log('State', state);
    })
    .addCase(loginAction.pending, (state) => {
      state.isAuth = false;
      state.jwt = null;
    })
    .addCase(loginAction.rejected, (state, action) => {
      state.isAuth = false;
      state.error = action.error.message ?? 'erreur';
    })
    .addCase(signUpAction.fulfilled, (state, action) => {
      state.isAuth = true;
      state.jwt = action.payload;
      console.log('Signature après succès:', state);
    })
    .addCase(signUpAction.pending, (state) => {
      state.isAuth = false;
      state.jwt = null;
    })
    .addCase(signUpAction.rejected, (state, action) => {
      state.isAuth = false;
      state.error = action.error.message ?? 'Erreur ';
    });
});

export default authReducer;
