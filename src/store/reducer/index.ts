import modalReducer from './modal';
import userReducer from './user';
import profileReducer from './profile';
import taskSlice from './task';

const reducer = {
  user: userReducer,
  modal: modalReducer,
  profile: profileReducer,
  task: taskSlice,
};

export default reducer;
