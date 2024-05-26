import React, { useEffect, useMemo } from 'react';
import './ProfilePage.scss';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import actionGetMembers from '../../../store/thunks/checkProfile';
import actionFetchTasks from '../../../store/thunks/fetchTasksByProfile';

function ProfilePage() {
  const dispatch = useAppDispatch();
  const accountId = useAppSelector((state) => state.user.id);
  const membersList = useAppSelector((state) => state.profile.members) || [];
  const tasksList = useAppSelector((state) => state.profile.tasks) || [];

  useEffect(() => {
    if (accountId) {
      dispatch(actionGetMembers({ id: accountId }));
    }
  }, [dispatch, accountId]);

  useEffect(() => {
    if (membersList.length > 0 && membersList[0]?.id !== undefined) {
      dispatch(actionFetchTasks({ id: membersList[0].id }));
    }
  }, [dispatch, membersList]);

  console.log('!!!! ProfilePage Members:', membersList);
  console.log('!!!! ProfilePage Tasks:', tasksList);

  const tasksByMember = useMemo(() => {
    const result = membersList.reduce((acc, member) => {
      if (member.id !== null) {
        const memberTasks = tasksList.filter((task) => {
          console.log('profile id: ', task.profile_id);
          console.log('member.id:', member.id);
          return task.profile_id === member.id;
        });
        console.log(`Tasks for member ${member.id}:`, memberTasks);
        acc[member.id] = memberTasks;
      }
      return acc;
    }, {} as Record<number, typeof tasksList>);
    console.log('Tasks grouped by member:', result);
    return result;
  }, [membersList, tasksList]);

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
          {membersList.map(
            (member) =>
              member.id !== null && (
                <div
                  key={member.id}
                  className="profilePage_container_member_card"
                >
                  <div className="profilePage_container_member_card_icones">
                    <FaTrashAlt className="profilePage_container_member_card_iconDelete" />
                    <FaEdit className="profilePage_container_member_card_iconEdit" />
                  </div>
                  <img
                    className="profilePage_container_memberCard_image"
                    src="./../../../src/assets/avatars/default-avatar.webp"
                    alt="avatar de l'utilisateur"
                  />
                  <h4 className="profilePage_container_member_card_name">
                    {member.name}
                  </h4>
                  {member.birthdate && (
                    <h5 className="profilePage_container_member_card_birthday">
                      Anniversaire :{' '}
                      {format(new Date(member.birthdate), 'dd MMMM yyyy', {
                        locale: fr,
                      })}
                    </h5>
                  )}
                  <h5 className="profilePage_container_member_card_score">
                    Score : {member.score}
                  </h5>
                  <h5 className="profilePage_container_member_card_task-to_do">
                    Tâches à faire :
                  </h5>
                  {tasksByMember[member.id] &&
                  tasksByMember[member.id].length > 0 ? (
                    (console.log(
                      'Tasks for member in boucle',
                      member.id,
                      ':',
                      tasksByMember[member.id]
                    ),
                    tasksByMember[member.id].map((task) => (
                      <div
                        key={task.id}
                        className="profilePage_container_member_card_task"
                      >
                        <h6 className="profilePage_container_member_card_task_name">
                          - {task.name}
                        </h6>
                        <p>
                          Date :{' '}
                          {format(new Date(task.start_date), 'dd MMMM yyyy', {
                            locale: fr,
                          })}
                        </p>
                      </div>
                    )))
                  ) : (
                    <p>Aucune tâche assignée.</p>
                  )}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
