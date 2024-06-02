import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { RootState } from '..';
import axiosInstance from '../../axios/axios';
import { MemberStateI } from '../../@types/memberStateI';

interface ProfilePayload {
  id: number | null;
}

const actionGetMembers = createAsyncThunk<
  { members: MemberStateI[] },
  ProfilePayload
>('profile/GET_MEMBERS', async (payload: ProfilePayload, thunkAPI) => {
  // const state = thunkAPI.getState() as RootState;
  try {
    const response = await axiosInstance.get(`/account/${payload.id}/profile`);

    return { members: response.data.data.profile };
    console.log('fetch thunks checkprofile', response.data.data.profile);
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(axiosError.response?.data);
  }
});

export default actionGetMembers;
