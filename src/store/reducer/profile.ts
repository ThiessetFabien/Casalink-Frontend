import { createAction, createReducer } from '@reduxjs/toolkit';
import actionGetMembers from '../thunks/checkProfile';
import actionFetchTasks from '../thunks/fetchTasksByProfile';
import { MemberStateI, TaskStateI } from '../../@types/memberStateI';

interface MembersState {
  members: MemberStateI[];
  tasks: TaskStateI[];
}

export const initialState: MembersState = {
  members: [],
  tasks: [],
};

const profileReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionGetMembers.fulfilled, (state, action) => {
    console.log('Members received in reducer:', action.payload.members);
    state.members = Array.isArray(action.payload.members)
      ? action.payload.members
      : [];
    console.log('Updated members in state:', state.members);
    console.log('liste des membres', action.payload.members);
  });
  builder.addCase(actionFetchTasks.fulfilled, (state, action) => {
    console.log('tasks received in reducer:', action.payload.tasks);
    state.tasks = Array.isArray(action.payload.tasks)
      ? action.payload.tasks
      : [];
    console.log('Updated tasks in state:', state.tasks);
    console.log('liste des tâches', action.payload.tasks);
  });
  // .addCase(actionAddMember, (state, action) => {
  //   state.members.push(action.payload);
  // });
  // .addCase(actionRemoveMember, (state, action) => {
  //   state.members = state.members.filter(
  //     (member) => member.id !== action.payload
  //   );
  // })
  // .addCase(actionUpdateMember, (state, action) => {
  //   const index = state.members.findIndex(
  //     (member) => member.id === action.payload.id
  //   );
  //   if (index !== -1) {
  //     state.members[index] = action.payload;
  //   }
  // })
  // .addCase(actionResetErrorMessage, (state) => {
  //   state.error = null;
  // });
});

export default profileReducer;
