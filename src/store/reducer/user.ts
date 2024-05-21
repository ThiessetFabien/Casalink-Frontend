import { createAction, createReducer } from '@reduxjs/toolkit';

interface UserStateI {
  logged: boolean;
  foyer: string;
  credentials: {
    email: string;
    password: string;
  };
  pseudo: null | string;
  token: null | string;
  error: null | string;
}

export const initialState: UserStateI = {
  logged: false,
  foyer: 'ma maison',
  credentials: {
    email: '',
    password: '',
  },
  pseudo: null,
  token: null,
  error: null,
};

export const actionChangeField = createAction<{
  name: 'email' | 'password';
  value: string;
}>('user/CHNAGE_CREDENTIAL');

export const actionLogout = createAction('user/LOG_OUT');

export const actionLogin = createAction('user/LOGIN');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionChangeField, (state, action) => {
      state.credentials[action.payload.name] = action.payload.value;
    })
    .addCase(actionLogout, (state) => {
      state.logged = false;
      state.pseudo = null;
    })
    .addCase(actionLogin, (state) => {
      state.logged = true;
    });
});

export default userReducer;
