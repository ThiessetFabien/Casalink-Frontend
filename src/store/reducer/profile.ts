import { createAction, createReducer } from '@reduxjs/toolkit';
import actionGetMembers from '../thunks/checkProfile';
import actionFetchTasks from '../thunks/fetchTasksByProfile';
import {
  actionDeleteProfile,
  actionUpdateProfile,
  actionUpdateRole,
} from '../thunks/changeProfile';
import { MemberStateI, TaskStateI } from '../../@types/memberStateI';

interface MembersState {
  members: MemberStateI[];
  tasks: TaskStateI[];
  memberSelected: MemberStateI | null;
  member: MemberStateI;
  isLoading: boolean;
}

interface PayloadChangeRole {
  id: number;
  role: 'child' | 'adult';
}

export const initialState: MembersState = {
  members: [],
  tasks: [],
  memberSelected: null,
  member: <MemberStateI>{},
  isLoading: false,
};

export const actionSelectProfile = createAction<MemberStateI>(
  'profile/SELECTPROFILE'
);

export const setCardSelected = createAction<MemberStateI>(
  'profile/SET_CARD_SELECTED'
);

export const actionChangeRole = createAction<PayloadChangeRole>(
  'profile/SWITCH_ROLE'
);

const profileReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionGetMembers.fulfilled, (state, action) => {
    state.isLoading = false;
    state.members = Array.isArray(action.payload.members)
      ? action.payload.members
      : [];
  });
  builder.addCase(actionGetMembers.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(actionFetchTasks.fulfilled, (state, action) => {
    state.tasks = Array.isArray(action.payload.tasks)
      ? action.payload.tasks
      : [];
  });
  builder.addCase(actionDeleteProfile.fulfilled, (state, action) => {
    state.members = state.members.filter(
      (member) => member.id !== action.meta.arg
    );
  });
  builder.addCase(actionUpdateProfile.fulfilled, (state, action) => {
    const index = state.members.findIndex(
      (member) => member.id === action.payload.id
    );
    if (index !== -1) {
      state.members[index] = action.payload;
    }
  });
  builder.addCase(actionSelectProfile, (state, action) => {
    state.memberSelected = action.payload;
  });
  builder.addCase(actionUpdateRole.fulfilled, (state, action) => {
    const { id, role } = action.payload;
    const member = state.members.find((m) => m.id === id);
    if (member) {
      member.role = role;
    }
  });
  builder.addCase(
    actionChangeRole,
    (
      state,
      action: {
        payload: PayloadChangeRole;
        type: string;
      }
    ) => {
      const { id, role } = action.payload;
      const member = state.members.find((m) => m.id === id);
      if (member) {
        member.role = role;
      }
    }
  );
});

export default profileReducer;
