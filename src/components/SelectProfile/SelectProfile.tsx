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
  if (!accountId) {
    return null; // ici afficher la page 404
  }
  return (
    <div className="selectProfile_container">
      <div className="selectProfile_container_member">
        <h3 className="selectProfile_container_member_title">Qui est-ce ?</h3>
        <div className="selectProfile_container_member_list">
          {membersList.map(
            (member) =>
              member.id !== null && (
                <div
                  key={member.id}
                  className="selectProfile_container_member_card"
                >
                  <Link
                    className="selectProfile_container_member_card_link"
                    to="/"
                    onClick={() => handleSelect(member)}
                  >
                    selectione
                  </Link>

                  <img
                    className="selectProfile_container_member_card_image"
                    src="./../../../src/assets/avatars/default-avatar.webp"
                    alt="avatar de l'utilisateur"
                  />
                  <h4 className="selectProfile_container_member_card_name">
                    {member.name}
                  </h4>
                </div>
              )
          )}
        </div>
        <div className="selectProfile_container_member_card_gestion">
          <Link
            className="selectProfile_container_member_card_gestion_link"
            to="/foyer"
          >
            Gérer les profils
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SelectProfile;
