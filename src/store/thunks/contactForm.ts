import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from '../../axios/axios';
import { MemberStateI, RoleI } from '../../@types/memberStateI';
import type { RootState } from '..';
import baseURL from '../../utils/baseURL';

interface ContactFormPayload {
  email: string;
  subject: string;
  message: string;
}

export const actionSendContactForm = createAsyncThunk<
  string,
  ContactFormPayload,
  { rejectValue: string }
>(
  'contact/SEND_CONTACT_FORM',
  async ({ email, subject, message }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/contact`, {
        method: 'POST',
        body: JSON.stringify({ email, subject, message }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return 'Votre message a bien été envoyé.';
      }
      const errorText = await response.text();
      return thunkAPI.rejectWithValue(
        errorText || 'Une erreur est survenue, veuillez réessayer.'
      );
    } catch (error) {
      console.error('Erreur:', error);
      return thunkAPI.rejectWithValue(
        'Une erreur est survenue, veuillez réessayer.'
      );
    }
  }
);

export default { actionSendContactForm };
