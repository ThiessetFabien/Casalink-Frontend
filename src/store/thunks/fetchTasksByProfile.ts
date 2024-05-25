import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { RootState } from '..';
import axiosInstance from '../../axios/axios';

interface Task {
  id: null | number;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  status: string;
  reward_point: number;
  category_id: number;
  priority: string;
  profileId: number;
}

interface TasksState {
  tasks: Task[];
}

interface TaskPayload {
  id: number | null;
}

export const initialState: TasksState = {
  tasks: [],
};

const actionFetchTasks = createAsyncThunk<
  TasksState,
  TaskPayload,
  { state: RootState }
>('profile/FETCH_TASKS', async (payload: TaskPayload, thunkAPI) => {
  try {
    console.log('Fetching tasks...');
    const response = await axiosInstance.get(`/task/profile/${payload.id}`);
    console.log('tasks received:', response.data);
    return { tasks: response.data.data.tasks };
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(axiosError.response?.data);
  }
});

export default actionFetchTasks;
