import './UserConnectedHeader.scss';

function UserHeader() {
  return (
    <div className="userDiv">
      <span className="userDiv_name">User1</span>
      <img className="userDiv_avatar" src="public/logo512.png" alt="test" />
    </div>
  );
}

export default UserHeader;
