import { useEffect } from 'react';
import './ProfilePage.scss';
import { format } from 'date-fns';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import actionGetMembers from '../../../store/thunks/checkProfile';

function ProfilePage() {
  const dispatch = useAppDispatch();
  const accountId = useAppSelector((state) => state.user.id);
  const membersList = useAppSelector((state) => state.profile.members);

  useEffect(() => {
    if (accountId) {
      dispatch(actionGetMembers({ id: accountId }));
    }
  }, [dispatch, accountId]);

  return (
    <div className="profilePage_container">
      <div className="profilePage_container_presentation">
        <h2 className="profilePage_container_title">Mon foyer</h2>
      </div>
      <div className="profilePage_container_member">
        <h3 className="profilePage_container_member_title">Membres</h3>
        <div className="profilePage_container_member_list">
          {membersList.map((member) => (
            <div key={member.id} className="profilePage_container_member_card">
              <img
                className="profilePage_container_memberCard_image"
                src="./../../../src/assets/avatars/default-avatar.webp"
                alt="avatar de l'utilisateur"
              />
              <h4 className="profilePage_container_member_card_name">
                {member.name}
              </h4>
              <h5 className="profilePage_container_member_card_birthday">
                Anniversaire : {format(new Date(member.birthday), 'dd/MM/yyyy')}
              </h5>
              <h5 className="profilePage_container_member_card_score">
                Score : {member.score}
              </h5>
              <h5 className="profilePage_container_member_card_task-to_do">
                Tâches à faire :
              </h5>
              <h6 className="profilePage_container_member_card_task_name">
                - Faire la vaisselle
              </h6>
              <FaEdit className="profilePage_container_member_card_iconEdit" />
              <FaTrashAlt className="profilePage_container_member_card_iconDelete" />
            </div>
          ))}
          ;
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
