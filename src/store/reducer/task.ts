import { createAction, createReducer } from '@reduxjs/toolkit';
import actionCheckLogin from '../thunks/checkLogin';
import { TaskStateI } from '../../@types/taskStateI';
import actionCheckSignup from '../thunks/checkSignup';

export const initialState: TaskStateI = {
  name: '',
  start_date: null,
  end_date: null,
  description: '',
};

export const actionChangeTask = createAction<{
  name: keyof TaskStateI;
  valueString: string | null;
  valueDate: Date | null;
}>('user/CHANGE_TASK');

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionChangeTask, (state, action) => {
    const { name, valueString, valueDate } = action.payload;
    if (valueString === 'string') {
      state[name] = valueString;
    } else if (valueDate instanceof Date) state[name] = valueDate;
  });
});

export default userReducer;
