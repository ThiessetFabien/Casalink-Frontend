import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { RootState } from '..';
import axiosInstance from '../../axios/axios';

interface Member {
  id: null | number;
  name: string;
  birthday: Date;
  score: number;
  tasks: string[];
  avatar: string;
}

interface MembersState {
  members: Member[];
}

interface ProfilePayload {
  id: number | null;
}

const actionAddTask = createAsyncThunk<
  MembersState,
  ProfilePayload,
  { state: RootState }
>('task/ADD_TASK', async (payload: ProfilePayload, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  try {
    const response = await axiosInstance.get(`/account/${payload.id}/profile`);
    // const { pseudo, token } = response.data;
    // addTokenJwtToAxiosInstance(token);
    // addTokenAndPseudoToLocalStorage(token, pseudo);
    //  return { pseudo, token };
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(axiosError.response?.data);
  }
});

export default actionAddTask;
