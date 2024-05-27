import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { TaskI, TaskInputI } from '../../@types/taskStateI';

interface TaskStateI {
  input: TaskInputI;
  list: TaskI[];
}

interface ChangeTaskPayload {
  name: keyof TaskInputI;
  value: string | number;
}

export const initialState: TaskStateI = {
  input: {
    id: 0,
    nameTask: '',
    descriptionTask: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    startTime: format(new Date(), 'HH:mm'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    endTime: format(new Date(), 'HH:mm'),
  },
  list: [],
};

// export const actionChangeTask = createAction<{
//   name: keyof TaskStateI;
//   valueString: string | null;
//   valueDate: Date | null;
// }>('user/CHANGE_TASK');

// const taskReducer = createReducer(initialState, (builder) => {
//   builder.addCase(actionChangeTask, (state, action) => {
//     const { name, valueString, valueDate } = action.payload;
//     if (valueString === 'string') {
//       state.input[name] = valueString;
//     } else if (valueDate instanceof Date) state.input[name] = valueDate;
//   });
// });

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    actionChangeTask(state, action: PayloadAction<ChangeTaskPayload>) {
      const { name, value } = action.payload;
      console.log(action.payload);
      (state.input[name] as string | number) = value;
    },
  },
});

export const { actionChangeTask } = taskSlice.actions;
export default taskSlice.reducer;
