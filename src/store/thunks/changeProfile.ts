import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from '../../axios/axios';
import { MemberStateI, RoleI } from '../../@types/memberStateI';
import type { RootState } from '..';

interface UploadProfileImagePayload {
  base64Image: string;
  profileId: number;
}

export const actionUploadProfileImage = createAsyncThunk<
  string,
  UploadProfileImagePayload,
  { rejectValue: string }
>(
  'profile/UPLOAD_PROFILE_IMAGE',
  async ({ base64Image, profileId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await axiosInstance.post('/profile/upload', {
        id: profileId,
        image: base64Image,
      });

      return response.data.filePath;
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage =
        typeof axiosError.response?.data === 'string'
          ? axiosError.response?.data
          : "Erreur lors de l'upload de l'image";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const actionDeleteProfile = createAsyncThunk<
  void,
  number | null,
  { rejectValue: string }
>('profile/DELETE_PROFILE', async (profile_id, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`/profile/${profile_id}`);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage =
      typeof axiosError.response?.data === 'string'
        ? axiosError.response?.data
        : 'Erreur de suppression';
    return thunkAPI.rejectWithValue(errorMessage);
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
    const errorMessage =
      typeof axiosError.response?.data === 'string'
        ? axiosError.response?.data
        : 'Erreur de modification';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const actionAddProfile = createAsyncThunk<
  MemberStateI,
  MemberStateI,
  { rejectValue: string }
>('profile/ADD_PROFILE', async (addProfile, thunkAPI) => {
  try {
    console.log('Updated Profile in Thunk:', addProfile);
    const state = thunkAPI.getState() as RootState;
    console.log('State:', state.user.id);
    const response = await axiosInstance.post(`/profile/`, {
      name: addProfile.name,
      role: addProfile.role,
      email: addProfile.email,
      pin: addProfile.pin,
      birthdate: addProfile.birthdate,
      score: 0,
      account_id: state.user.id,
    });
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage =
      typeof axiosError.response?.data === 'string'
        ? axiosError.response?.data
        : "Erreur lors de l'ajout d'un profil";
    return thunkAPI.rejectWithValue(errorMessage);
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
