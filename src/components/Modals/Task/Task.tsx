import { useEffect, useRef, useState } from 'react';
import './Task.scss';
import { Trash2, X } from 'react-feather';

import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionSwitchTaskModal } from '../../../store/reducer/modal';
import { actionChangeTask } from '../../../store/reducer/task';
import { TaskInputI, TaskPropsI } from '../../../@types/taskStateI';
import { EventsI } from '../../../@types/events';
import { actionDeleteTask } from '../../../store/thunks/checkTask';
import { MemberStateI } from '../../../@types/memberStateI';

function Task({
  taskModalMode,
  eventSelect,
  addTask,
  editTask,
  membersList,
  memberSelected,
}: TaskPropsI) {
  const dispatch = useAppDispatch();
  const backgroundTaskRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const {
    startDate,
    startTime,
    endTime,
    endDate,
    id,
    nameTask,
    descriptionTask,
  } = useAppSelector((state) => state.task.input);

  useEffect(() => {
    if (backgroundTaskRef.current) {
      backgroundTaskRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (eventSelect) {
      dispatch(actionChangeTask({ name: 'id', value: eventSelect.id }));
      dispatch(
        actionChangeTask({ name: 'nameTask', value: eventSelect.nameTask })
      );
      dispatch(
        actionChangeTask({
          name: 'descriptionTask',
          value: eventSelect.descriptionTask,
        })
      );
      dispatch(
        actionChangeTask({
          name: 'startDate',
          value: format(eventSelect.start, 'yyyy-MM-dd'),
        })
      );
      dispatch(
        actionChangeTask({
          name: 'startTime',
          value: format(eventSelect.start, 'HH:mm'),
        })
      );
      dispatch(
        actionChangeTask({
          name: 'endDate',
          value: format(eventSelect.end, 'yyyy-MM-dd'),
        })
      );
      dispatch(
        actionChangeTask({
          name: 'endTime',
          value: format(eventSelect.end, 'HH:mm'),
        })
      );
    }
  }, [dispatch, eventSelect]);

  // Prevent the click propagation to parent
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleChange = (name: keyof TaskInputI, value: string) => {
    dispatch(actionChangeTask({ name, value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const start = new Date(`${startDate}T${startTime}:00.000`);
    const end = new Date(`${endDate}T${endTime}:00.000`);
    const title = nameTask;
    const description = descriptionTask;

    const memberTarget = parseInt(selectedValue, 10);
    console.log(typeof memberTarget, memberTarget);
    if (taskModalMode === 'add' && memberTarget !== null)
      addTask(start, end, title, description, memberTarget);
    else if (taskModalMode === 'add' && Number.isNaN(memberTarget))
      addTask(start, end, title, description);
    else if (taskModalMode === 'edit')
      editTask(id, start, end, title, description);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div
      className="task_background"
      role="button"
      tabIndex={0}
      ref={backgroundTaskRef}
      onClick={() => {
        dispatch(actionSwitchTaskModal());
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') dispatch(actionSwitchTaskModal());
      }}
    >
      <div
        className="task_modal"
        role="presentation"
        onClick={handleModalClick}
      >
        <div className="task_modal_btns">
          <button
            type="button"
            className="task_modal_btns_delete"
            onClick={() => {
              dispatch(actionDeleteTask({ id: eventSelect?.id }));
              dispatch(actionSwitchTaskModal());
            }}
          >
            <Trash2 />
          </button>
          <button
            type="button"
            className="task_modal_btns_exit"
            onClick={() => {
              dispatch(actionSwitchTaskModal());
            }}
          >
            <X />
          </button>
        </div>

        <form className="task_modal_form" onSubmit={handleSubmit}>
          <input
            className=""
            type="text"
            name="task_name"
            placeholder="Nom de la tâche"
            required
            value={nameTask}
            onChange={(e) => handleChange('nameTask', e.target.value)}
          />
          <fieldset className="task_modal_form_dateTime">
            <input
              className=""
              type="date"
              name="task_start_date"
              required
              value={startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
            />
            <input
              className=""
              type="time"
              name="task_start_time"
              required
              value={startTime}
              onChange={(e) => handleChange('startTime', e.target.value)}
            />
          </fieldset>

          <fieldset className="task_modal_form_dateTime">
            <input
              className=""
              type="date"
              name="task_end_date"
              required
              value={endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
            />
            <input
              className=""
              type="time"
              name="task_end_time"
              required
              value={endTime}
              onChange={(e) => handleChange('endTime', e.target.value)}
            />
          </fieldset>

          <textarea
            className="task_modal_form_description"
            rows={3}
            name="task_description"
            placeholder="Description.."
            value={descriptionTask}
            onChange={(e) => handleChange('descriptionTask', e.target.value)}
          />

          {memberSelected?.role === 'adult' && (
            <fieldset className="task_modal_form_member">
              <label htmlFor="select">Tâche à attribuer à</label>
              <select
                id="select"
                className="task_modal_form_member_select"
                name="task_member"
                value={selectedValue}
                onChange={handleSelectChange}
              >
                <option value="">Général</option>
                {membersList.map((member) => (
                  <option
                    key={member.id}
                    value={member.id?.toString() ? member.id : 'error'}
                  >
                    {member.name}
                  </option>
                ))}
              </select>
            </fieldset>
          )}

          <button type="submit">Valider</button>
        </form>
      </div>
    </div>
  );
}

export default Task;
