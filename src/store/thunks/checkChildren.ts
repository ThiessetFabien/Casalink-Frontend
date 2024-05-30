import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { RootState } from '..';
import axiosInstance from '../../axios/axios';
import { MemberStateI } from '../../@types/memberStateI';

interface ProfilePayload {
  id: number | null;
}

const actionSwitchRestriction = createAction<string>(
  'CHANGE_STATE_MEMBER_ROLE'
);

export default actionSwitchRestriction;
