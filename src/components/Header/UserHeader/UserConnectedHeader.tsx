import { LogOut } from 'react-feather';
import { useAppDispatch } from '../../../hooks/redux';

import './UserConnectedHeader.scss';
import { actionLogout } from '../../../store/reducer/user';

function UserHeader() {
  const dispatch = useAppDispatch();
  // const handleLogout = () => {
  //   console.log('jai cliqué');
  // };
  return (
    <div className="userDiv">
      <span className="userDiv_name">User1</span>
      <LogOut
        className="userDiv_logout"
        onClick={() => {
          dispatch(actionLogout());
        }}
      />
    </div>
  );
}

export default UserHeader;
