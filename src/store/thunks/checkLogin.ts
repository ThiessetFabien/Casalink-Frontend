import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '..';
import axiosInstance, { addTokenJwtToAxiosInstance } from '../../axios/axios';
import { addTokenAndPseudoToLocalStorage } from '../../localStorage/localStorage';

const actionCheckLogin = createAsyncThunk(
  'user/CHECK_LOGIN',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.post('/api/v1/login', {
      email: state.user.credentials.login.emailSignin,
      password: state.user.credentials.login.passwordSignin,
    });

    const { pseudo, token } = response.data;
    addTokenJwtToAxiosInstance(token);
    addTokenAndPseudoToLocalStorage(token, pseudo);
    return { pseudo, token };
  }
);

export default actionCheckLogin;
