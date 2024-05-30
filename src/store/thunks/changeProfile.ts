import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { FaFileExport } from 'react-icons/fa';
import axiosInstance from '../../axios/axios';
import { MemberStateI, RoleI } from '../../@types/memberStateI';
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
    // console.log('image name :', updatedProfile.image);
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

export const actionUpdateRole = createAsyncThunk<MemberStateI, RoleI>(
  'profile/UPDATE_PROFILE_ROLE',
  async ({ memberId, role }, thunkAPI) => {
    try {
      // console.log('image name :', updatedProfile.image);
      // const state = thunkAPI.getState() as RootState;
      const response = await axiosInstance.patch(`/profile/${memberId}`, {
        role,
      });
      console.log('je suis la réponse', response);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || 'Erreur de modification'
      );
    }
  }
);

export default { actionDeleteProfile, actionUpdateProfile, actionUpdateRole };
