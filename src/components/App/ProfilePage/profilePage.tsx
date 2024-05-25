import React, { useEffect } from 'react';
import './ProfilePage.scss';
import format from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import actionGetMembers from '../../../store/thunks/checkProfile';
import actionFetchTasks from '../../../store/thunks/fetchTasksByProfile';

function ProfilePage() {
  const dispatch = useAppDispatch();
  const accountId = useAppSelector((state) => state.user.id);
  const membeeId = useAppSelector(
    (state) => state.profile.members[0]?.id || null
  );
  const membersList = useAppSelector((state) => state.profile.members) || [];
  const tasksList = useAppSelector((state) => state.profile.tasks) || [];

  useEffect(() => {
    if (accountId !== null) {
      dispatch(actionGetMembers({ id: accountId }));
      dispatch(actionFetchTasks({ id: membeeId }));
    }
  }, [dispatch, accountId, membeeId]);

  console.log('!!!! ProfilePage Members:', membersList);
  console.log('!!!! ProfilePage Tasks:', tasksList);

  const getTasksForMember = (memberId: number | null) => {
    return tasksList.filter((task) => task.profileId === memberId);
  };

  if (!Array.isArray(membersList)) {
    return <div>Erreur : les membres ne sont pas disponibles.</div>;
  }

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
                Anniversaire :{' '}
                {format(new Date(member.birthday), 'dd/MM/yyyy', {
                  locale: fr,
                })}
              </h5>
              <h5 className="profilePage_container_member_card_score">
                Score : {member.score}
              </h5>
              <h5 className="profilePage_container_member_card_task-to_do">
                Tâches à faire :
              </h5>
              {getTasksForMember(member.id).map((task) => (
                <div
                  key={task.id}
                  className="profilePage_container_member_card_task"
                >
                  <h6 className="profilePage_container_member_card_task_name">
                    - {task.name}
                  </h6>
                  <p>
                    Date :{' '}
                    {format(new Date(task.start_date), 'dd/MM/yyyy', {
                      locale: fr,
                    })}
                  </p>
                </div>
              ))}
              <FaEdit className="profilePage_container_member_card_iconEdit" />
              <FaTrashAlt className="profilePage_container_member_card_iconDelete" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
