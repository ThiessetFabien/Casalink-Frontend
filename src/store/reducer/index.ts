import modalReducer from './modal';
import userReducer from './user';

const reducer = {
  user: userReducer,
  modal: modalReducer,
};

export default reducer;
