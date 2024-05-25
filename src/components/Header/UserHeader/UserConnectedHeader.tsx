import './UserConnectedHeader.scss';

function UserHeader() {
  return (
    <div className="userDiv">
      <img
        src="public/testavatar.png"
        alt="userAvatar"
        className="userDiv_name"
      />
    </div>
  );
}

export default UserHeader;
