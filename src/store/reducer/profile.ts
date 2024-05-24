import { createAction, createReducer } from '@reduxjs/toolkit';
import actionGetMembers from '../thunks/checkProfile';

interface Member {
  id: null | number;
  name: string;
  birthday: Date;
  score: number;
  tasks: string[];
  avatar: string;
}

interface MembersState {
  members: Member[];
}

// État initial
export const initialState: MembersState = {
  members: [],
};

const profileReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionGetMembers.fulfilled, (state, action) => {
    state.members = action.payload.members;
    console.log('liste des membres', action.payload.members);
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
