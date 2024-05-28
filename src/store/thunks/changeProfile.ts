import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { FaFileExport } from 'react-icons/fa';
import axiosInstance from '../../axios/axios';
import { MemberStateI } from '../../@types/memberStateI';
import type { RootState } from '..';

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
  MemberStateI,
  MemberStateI,
  { rejectValue: string }
>('profile/UPDATE_PROFILE', async (updatedProfile, thunkAPI) => {
  try {
    console.log('Updated Profile in Thunk:', updatedProfile);
    console.log('Updated Profile id:', updatedProfile.id);
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.patch(
      `/profile/${updatedProfile.id}`,
      {
        name: updatedProfile.name,
        role: updatedProfile.role,
        email: updatedProfile.email,
        pin: updatedProfile.pin,
        birthdate: updatedProfile.birthdate,
      }
    );
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(
      axiosError.response?.data || 'Erreur de modification'
    );
  }
});

export const actionAddProfile = createAsyncThunk<
  MemberStateI,
  MemberStateI,
  { rejectValue: string }
>('profile/ADD_PROFILE', async (addProfile, thunkAPI) => {
  try {
    console.log('Updated Profile in Thunk:', addProfile);
    console.log('Updated Profile id:', addProfile.id);
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.post(`/profile/`, {
      name: addProfile.name,
      role: addProfile.role,
      email: addProfile.email,
      pin: addProfile.pin,
      birthdate: addProfile.birthdate,
      score: 0,
    });
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(
      axiosError.response?.data || 'Erreur lors de l\'ajout d\'un profil'
    );
  }
});

export default { actionDeleteProfile, actionUpdateProfile, actionAddProfile };
