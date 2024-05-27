import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { TaskI, TaskInputI } from '../../@types/taskStateI';
import { EventsI } from '../../@types/events';

interface TaskStateI {
  input: TaskInputI;
  list: EventsI[];
}

interface ChangeTaskPayload {
  name: keyof TaskInputI;
  value: string | number | null;
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
      (state.input[name] as string | number | null) = value;
    },
    actionAddTask(state, action) {
      const { id, start, end, nameTask, descriptionTask } = action.payload;
      state.list.push({ id, start, end, nameTask, descriptionTask });
    },
    actionEditTask(state, action) {
      const { id, start, end, nameTask, descriptionTask } = action.payload;
      state.list = state.list.map((ev) =>
        ev.id === id ? { ...ev, start, end, nameTask, descriptionTask } : ev
      );
    },
    actionDragAndDropTask(state, action) {
      const { event, start, end } = action.payload;
    },
    actionResizeTask(state, action) {
      const { event, start, end } = action.payload;
    },
  },
});

export const { actionChangeTask, actionAddTask, actionEditTask } =
  taskSlice.actions;
export default taskSlice.reducer;
