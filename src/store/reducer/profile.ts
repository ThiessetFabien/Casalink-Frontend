import { createAction, createReducer } from '@reduxjs/toolkit';
import actionGetMembers from '../thunks/checkProfile';
import actionFetchTasks from '../thunks/fetchTasksByProfile';
import {
  actionDeleteProfile,
  actionUpdateProfile,
  actionUpdateRole,
} from '../thunks/changeProfile';
import { MemberStateI, TaskStateI } from '../../@types/memberStateI';
import actionSwitchRestriction from '../thunks/checkChildren';

interface MembersState {
  members: MemberStateI[];
  tasks: TaskStateI[];
  member: MemberStateI;
}

export const initialState: MembersState = {
  members: [],
  tasks: [],
  member: <MemberStateI>{},
};

export const actionChangeRole = createAction('profile/SWITCH_ROLE');

const profileReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionGetMembers.fulfilled, (state, action) => {
    console.log('je suis actionGetMembers');

    state.members = Array.isArray(action.payload.members)
      ? action.payload.members
      : [];
    console.log('Updated members in state:', state.members);
    console.log('liste des membres', action.payload.members);
  });
  builder.addCase(actionFetchTasks.fulfilled, (state, action) => {
    state.tasks = Array.isArray(action.payload.tasks)
      ? action.payload.tasks
      : [];
    console.log('Updated tasks in state:', state.tasks);
    console.log('liste des tâches', action.payload.tasks);
  });
  builder.addCase(actionDeleteProfile.fulfilled, (state, action) => {
    state.members = state.members.filter(
      (member) => member.id !== action.meta.arg
    );
    console.log('Updated members after deletion:', state.members);
  });
  builder.addCase(actionUpdateProfile.fulfilled, (state, action) => {
    const index = state.members.findIndex(
      (member) => member.id === action.payload.id
    );
    if (index !== -1) {
      state.members[index] = action.payload;
    }
    console.log('Updated members after modification:', state.members);
  });
  builder.addCase(actionUpdateRole.fulfilled, (state, action) => {
    const { memberId, role } = action.payload;
    const member = state.members.find((m) => m.id === memberId);
    if (member) {
      member.role = role;
    }
  });
  builder.addCase(actionChangeRole, (state, action) => {
    const { memberId, role } = action.payload;
    const member = state.members.find((m) => m.id === memberId);
    if (member) {
      member.role = role;
    }
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
