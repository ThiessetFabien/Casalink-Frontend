import { createAction, createReducer } from '@reduxjs/toolkit';

interface ModalStateI {
  loginModalIsOpen: boolean;
  loginModalIsMode: 'signin' | 'signup';
  taskModalIsOpen: boolean;
}

export const initialState: ModalStateI = {
  loginModalIsOpen: false,
  loginModalIsMode: 'signin',
  taskModalIsOpen: false,
};

export const actionSwitchLoginModal = createAction('modal/SWITCH_LOGIN_MODAL');
export const actionSwitchTaskModal = createAction('modal/SWITCH_TASK_MODAL');
export const actionSetModeLoginModal = createAction<'signin' | 'signup'>(
  'modal/SET_MODE_LOGIN_MODAL'
);

const modalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionSwitchLoginModal, (state) => {
      state.loginModalIsOpen = !state.loginModalIsOpen;
    })
    .addCase(actionSwitchTaskModal, (state) => {
      state.taskModalIsOpen = !state.taskModalIsOpen;
    })
    .addCase(actionSetModeLoginModal, (state, action) => {
      state.loginModalIsMode = action.payload;
    });
});

export default modalReducer;
