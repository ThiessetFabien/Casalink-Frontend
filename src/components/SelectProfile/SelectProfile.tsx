import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './SelectProfile.scss';
import actionGetMembers from '../../store/thunks/checkProfile';
import { MemberStateI } from '../../@types/memberStateI';
import { actionSelectProfile } from '../../store/reducer/profile';
import { Link } from 'react-router-dom';

function SelectProfile() {
  const dispatch = useAppDispatch();
  const membersList = useAppSelector((state) => state.profile.members) || [];
  const accountId = useAppSelector((state) => state.user.id);
  const memberSelected = useAppSelector(
    (state) => state.profile.memberSelected
  );
  useEffect(() => {
    if (accountId) {
      dispatch(actionGetMembers({ id: accountId }));
    }
  }, [dispatch, accountId]);
  console.log(membersList);
  const handleSelect = (member: MemberStateI) => {
    dispatch(actionSelectProfile(member));

    console.log('click', memberSelected);
  };
  return (
    <div className="profilePage_container">
      <div className="profilePage_container_presentation">
        <h2 className="profilePage_container_title">Mon foyer</h2>
      </div>
      <div className="profilePage_container_member">
        <h3 className="profilePage_container_member_title">Membres</h3>
        <div className="profilePage_container_member_list">
          {membersList.map(
            (member) =>
              member.id !== null && (
                <div
                  key={member.id}
                  className="profilePage_container_member_card"
                >
                  <Link to="/" onClick={() => handleSelect(member)}>
                    s
                  </Link>

                  <img
                    className="profilePage_container_memberCard_image"
                    src="./../../../src/assets/avatars/default-avatar.webp"
                    alt="avatar de l'utilisateur"
                  />
                  <h4 className="profilePage_container_member_card_name">
                    {member.name}
                  </h4>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectProfile;
