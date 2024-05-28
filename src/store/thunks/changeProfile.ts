import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { FaFileExport } from 'react-icons/fa';
import axiosInstance from '../../axios/axios';
import { MemberStateI } from '../../@types/memberStateI';

export const actionDeleteProfile = createAsyncThunk<
  void,
  number,
  { rejectValue: string }
>('profile/DELETE_PROFILE', async (profile_id, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`/profile/${profile_id}`);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(
      axiosError.response?.data || 'Erreur de suppression'
    );
  }
});

export const actionUpdateProfile = createAsyncThunk<
  void,
  number,
  { rejectValue: string }
>('profile/UPDATE_PROFILE', async (profile_id, thunkAPI) => {
  try {
    const response = await axiosInstance.patch(
      `/profile/${profile_id}`,
      updatedProfile
    );
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(
      axiosError.response?.data || 'Erreur de modification'
    );
  }
});

export default { actionDeleteProfile, actionUpdateProfile };
