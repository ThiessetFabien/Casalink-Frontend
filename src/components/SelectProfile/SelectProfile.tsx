import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './SelectProfile.scss';
import actionGetMembers from '../../store/thunks/checkProfile';
import { MemberStateI } from '../../@types/memberStateI';
import { actionSelectProfile } from '../../store/reducer/profile';
import baseURL from '../../utils/baseURL';
import { addProfileToLocalStorage } from '../../localStorage/localStorage';

function SelectProfile() {
  const dispatch = useAppDispatch();
  const membersList = useAppSelector((state) => state.profile.members) || [];
  const accountId = useAppSelector((state) => state.user.id);
  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);

  useEffect(() => {
    async function fetchMembers() {
      if (accountId) {
        await dispatch(actionGetMembers({ id: accountId }));
      }
    }
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, accountId]);

  const handleSelect = (member: MemberStateI) => {
    dispatch(actionSelectProfile(member));
    addProfileToLocalStorage(member);
  };
  if (!accountId) {
    return null; // ici afficher la page 404
  }
  return (
    <div
      className={`${
        isDarkMode ? 'selectProfile_container-dark' : ''
      } selectProfile_container`}
    >
      <div
        className={`${
          isDarkMode ? 'selectProfile_container-dark_member' : ''
        } selectProfile_container_member`}
      >
        <h3
          className={`${
            isDarkMode ? 'selectProfile_container-dark_member_title' : ''
          } selectProfile_container_member_title`}
        >
          Qui est-ce ?
        </h3>
        <div
          className={`${
            isDarkMode ? 'selectProfile_container-dark_member_list' : ''
          } selectProfile_container_member_list`}
        >
          {membersList.map(
            (member) =>
              member.id !== null && (
                <div
                  key={member.id}
                  className={`${
                    isDarkMode ? 'selectProfile_container-dark_member_card' : ''
                  } selectProfile_container_member_card`}
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
                    src={
                      member.image
                        ? `${baseURL}/${member.image}`
                        : `${baseURL}/uploads/avatars/default-avatar.webp`
                    }
                    alt="avatar de l'utilisateur"
                  />
                  <h4
                    className={`${
                      isDarkMode
                        ? 'selectProfile_container-dark_member_card_name'
                        : ''
                    } selectProfile_container_member_card_name`}
                  >
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
