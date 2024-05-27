import { useEffect, useRef, useState } from 'react';
import './Task.scss';
import { X } from 'react-feather';

import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionSwitchTaskModal } from '../../../store/reducer/modal';
import { actionChangeTask } from '../../../store/reducer/task';
import { TaskInputI } from '../../../@types/taskStateI';
import { EventsI } from '../../../@types/events';

interface TaskI {
  taskModalMode: 'add' | 'edit';
  eventSelect: EventsI | null;
  addTask: (start: Date, end: Date, title: string, description: string) => void;
  editTask: (
    id: number,
    start: Date,
    end: Date,
    title: string,
    description: string
  ) => void;
}

function Task({ taskModalMode, eventSelect, addTask, editTask }: TaskI) {
  // const [startDate, setStartDate] = useState(Date);
  // const [startTime, setStartTime] = useState(Date);
  // const [endDate, setEndDate] = useState(Date);
  // const [endTime, setEndTime] = useState(Date);
  // const [id, setId] = useState(0);
  // const [taskTitle, setTaskTitle] = useState('');
  // const [taskDescription, setTaskDescription] = useState('');

  const dispatch = useAppDispatch();
  const backgroundTaskRef = useRef<HTMLDivElement>(null);

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
      // setStartDate(format(eventSelect.start, 'yyyy-MM-dd'));
      // setStartTime(format(eventSelect.start, 'HH:mm'));
      // setEndDate(format(eventSelect.end, 'yyyy-MM-dd'));
      // setEndTime(format(eventSelect.end, 'HH:mm'));
      // setTaskTitle(eventSelect.title);
      // setTaskDescription(eventSelect.content || '');
      // if (eventSelect.id) setId(eventSelect.id);
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
    if (taskModalMode === 'add') addTask(start, end, title, description);
    else if (taskModalMode === 'edit')
      editTask(id, start, end, title, description);
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
        <button
          type="button"
          className="task_modal_exit_button"
          onClick={() => {
            dispatch(actionSwitchTaskModal());
          }}
        >
          <X />
        </button>
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
            className=""
            rows={3}
            name="task_description"
            placeholder="Description.."
            value={descriptionTask}
            onChange={(e) => handleChange('descriptionTask', e.target.value)}
          />
          <button type="submit">Valider</button>
        </form>
      </div>
    </div>
  );
}

export default Task;
