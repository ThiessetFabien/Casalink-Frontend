import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '..';

const actionCheckLogin = createAsyncThunk(
  'user/CHECK_LOGIN',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axios.post('route back', {
      email: state.user.credentials.email,
      password: state.user.credentials.password,
    });
    const { pseudo, token } = response.data;
    return { pseudo, token };
  }
);

export default actionCheckLogin;
