import { createAction, createReducer } from '@reduxjs/toolkit';

interface ModalStateI {
  loginModalIsOpen: boolean;
}

export const initialState: ModalStateI = {
  loginModalIsOpen: false,
};

export const actionSwitchLoginModal = createAction('modal/SWITCH_LOGIN_MODAL');

const modalReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionSwitchLoginModal, (state, action) => {
    state.loginModalIsOpen = !state.loginModalIsOpen;
  });
});

export default modalReducer;
