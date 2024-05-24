import modalReducer from './modal';
import userReducer from './user';
import profileReducer from './profile';

const reducer = {
  user: userReducer,
  modal: modalReducer,
  profile: profileReducer,
};

export default reducer;
