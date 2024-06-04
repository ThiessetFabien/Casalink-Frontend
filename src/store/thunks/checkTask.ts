import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from '../../axios/axios';
import { EventsI, EventsWithMemberI } from '../../@types/events';
import { MemberStateI } from '../../@types/memberStateI';

const actionAddTask = createAsyncThunk(
  'task/ADD_TASK',
  async (payload: EventsWithMemberI, thunkAPI) => {
    try {
      let response;
      if (Number.isNaN(payload.memberTarget)) {
        response = await axiosInstance.post(`/task/account/${payload.id}`, {
          name: payload.nameTask,
          description: payload.descriptionTask,
          start_date: payload.start,
          end_date: payload.end,
          category_id: '1',
        });
      } else {
        response = await axiosInstance.post(
          `/task/profile/${payload.memberTarget}`,
          {
            name: payload.nameTask,
            description: payload.descriptionTask,
            start_date: payload.start,
            end_date: payload.end,
            category_id: '1',
            account_id: payload.id,
          }
        );
      }
      const newTask = { ...payload, id: response.data.data.task.id };
      return newTask;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

const actionModifyTask = createAsyncThunk(
  'task/CHANGE_TASK',
  async (payload: EventsI, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/task/${payload.id}`, {
        name: payload.nameTask,
        description: payload.descriptionTask,
        start_date: payload.start,
        end_date: payload.end,
        category_id: '1',
      });
      const newTask = { ...payload, id: response.data.data.task.id };
      return newTask;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

const actionGetTask = createAsyncThunk(
  'task/GET_TASK',
  async (payload: { id: number; member: MemberStateI }, thunkAPI) => {
    try {
      let response;
      if (payload.member.role === 'adult')
        response = await axiosInstance.get(`/task/account/${payload.id}`);
      if (payload.member.role === 'child')
        response = await axiosInstance.get(
          `/task/profile/${payload.member.id}`
        );
      console.log('je suis la response', response);
      if (response) return response.data.data.tasks;
      return null;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

const actionDeleteTask = createAsyncThunk(
  'task/DELETE_TASK',
  async (payload: { id: number | null }, thunkAPI) => {
    try {
      await axiosInstance.delete(`/task/${payload.id}`);
      return payload.id;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

export { actionAddTask, actionModifyTask, actionGetTask, actionDeleteTask };
