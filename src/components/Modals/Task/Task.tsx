import { useEffect, useRef, useState } from 'react';
import './Task.scss';
import { X } from 'react-feather';

import { format } from 'date-fns';
import { useAppDispatch } from '../../../hooks/redux';
import { actionSwitchTaskModal } from '../../../store/reducer/modal';

interface EventsI {
  id?: number;
  title: string;
  content: string | null;
  start: Date;
  end: Date;
}

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
  const [startDate, setStartDate] = useState(Date);
  const [startTime, setStartTime] = useState(Date);
  const [endDate, setEndDate] = useState(Date);
  const [endTime, setEndTime] = useState(Date);
  const [id, setId] = useState(0);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const dispatch = useAppDispatch();
  const backgroundTaskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (backgroundTaskRef.current) {
      backgroundTaskRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (eventSelect) {
      setStartDate(format(eventSelect.start, 'yyyy-MM-dd'));
      setStartTime(format(eventSelect.start, 'HH:mm'));
      setEndDate(format(eventSelect.end, 'yyyy-MM-dd'));
      setEndTime(format(eventSelect.end, 'HH:mm'));
      setTaskTitle(eventSelect.title);
      setTaskDescription(eventSelect.content || '');
      if (eventSelect.id) setId(eventSelect.id);
    }
  }, [eventSelect]);

  // Prevent the click propagation
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const start = new Date(`${startDate}T${startTime}:00.000`);
    const end = new Date(`${endDate}T${endTime}:00.000`);
    const title = taskTitle;
    const description = taskDescription;
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
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <fieldset className="task_modal_form_dateTime">
            <input
              className=""
              type="date"
              name="task_start_date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              className=""
              type="time"
              name="task_start_time"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </fieldset>

          <fieldset className="task_modal_form_dateTime">
            <input
              className=""
              type="date"
              name="task_end_date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <input
              className=""
              type="time"
              name="task_end_time"
              required
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </fieldset>

          <textarea
            className=""
            rows={3}
            name="task_description"
            placeholder="Description.."
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <button type="submit">Valider</button>
        </form>
      </div>
    </div>
  );
}

export default Task;
