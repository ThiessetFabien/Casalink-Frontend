import { createAction, createReducer } from '@reduxjs/toolkit';
import actionCheckLogin from '../thunks/checkLogin';

interface UserStateI {
  logged: boolean;
  foyer: string;
  credentials: {
    login: {
      emailSignin: string;
      passwordSignin: string;
    };
    signup: {
      email: string;
      password: string;
      passwordConfirm: string;
      street: string;
      postalCode: string;
      country: string;
    };
  };
  pseudo: null | string;
  token: null | string;
  error: null | string;
}

export const initialState: UserStateI = {
  logged: true,
  foyer: 'ma maison',
  credentials: {
    login: {
      emailSignin: '',
      passwordSignin: '',
    },
    signup: {
      email: '',
      password: '',
      passwordConfirm: '',
      street: '',
      postalCode: '',
      country: '',
    },
  },
  pseudo: null,
  token: null,
  error: null,
};

export const actionChangeCredentials = createAction<{
  name: 'emailSignin' | 'passwordSignin';
  value: string;
}>('user/CHNAGE_CREDENTIAL');

export const actionLogout = createAction('user/LOG_OUT');

// jwt & pseudo: prorpiétés
export const actionLogin = createAction<{
  jwt: string;
  pseudo: string | null;
}>('user/LOGIN');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionChangeCredentials, (state, action) => {
      state.credentials.login[action.payload.name] = action.payload.value;
    })
    .addCase(actionLogout, (state) => {
      state.logged = false;
      state.pseudo = null;
    })
    .addCase(actionLogin, (state, action) => {
      state.logged = true;
      state.token = action.payload.jwt;
      state.pseudo = action.payload.pseudo;
      state.error = null;
    })
    .addCase(actionCheckLogin.fulfilled, (state, action) => {
      state.logged = true;
      // state.pseudo = action.payload.pseudo;
      // state.token = action.payload.token;
      state.error = null;
    })
    .addCase(actionCheckLogin.rejected, (state, action) => {
      state.error = 'Identifiant ou mot de passe inccorect';
    });
});

export default userReducer;
