import { useCallback, useEffect, useState } from 'react';
import { Calendar, DateLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { addHours, format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actionSwitchTaskModal } from '../../store/reducer/modal';

import './HomePage.scss';
import Task from '../Modals/Task/Task';
import { mlocalizer, messages } from '../../utils/calendarParams';
import { EventsI } from '../../@types/events';
import {
  actionAddTask,
  actionGetTask,
  actionModifyTask,
} from '../../store/thunks/checkTask';

interface DragNDropI {
  event: EventsI;
  startUnserielized: Date;
  endUnserielized: Date;
}

const DragNDropCalendar = withDragAndDrop<EventsI>(Calendar);

function HomePage() {
  // const [events, setEvents] = useState<EventsI[]>([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [eventSelected, setEventSelected] = useState<null | EventsI>(null);
  const [taskModalMode, setTaskModalMode] = useState<'add' | 'edit'>('add');
  const taskModalIsOpen = useAppSelector(
    (state) => state.modal.taskModalIsOpen
  );
  const accountId = useAppSelector((state) => state.user.id);
  const events = useAppSelector((state) =>
    state.task.list.map((task) => ({
      ...task,
      title: task.nameTask,
      start: new Date(task.start),
      end: new Date(task.end),
    }))
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (accountId !== null) dispatch(actionGetTask({ id: accountId }));
  }, [accountId, dispatch]);

  // const setEvents = useCallback(
  //   (eventsList: EventsI[]) => {
  //     dispatch(actionAddTask(eventsList));
  //   },
  //   [dispatch]
  // );

  const addTask = (
    startUnserielized: Date,
    endUnserielized: Date,
    title: string,
    content: string
  ) => {
    const start = format(startUnserielized, 'yyyy-MM-dd HH:mm');
    const end = format(endUnserielized, 'yyyy-MM-dd HH:mm');
    dispatch(
      actionAddTask({
        id: accountId,
        start,
        end,
        nameTask: title,
        descriptionTask: content,
      })
    );
    dispatch(actionSwitchTaskModal());
  };

  const editTask = (
    id: number,
    startUnserielized: Date,
    endUnserielized: Date,
    title: string,
    content: string
  ) => {
    const start = format(startUnserielized, 'yyyy-MM-dd HH:mm');
    const end = format(endUnserielized, 'yyyy-MM-dd HH:mm');
    dispatch(
      actionModifyTask({
        id,
        start,
        end,
        nameTask: title,
        descriptionTask: content,
      })
    );
    dispatch(actionSwitchTaskModal());
  };

  // We put a useCallback to avoid the function recreation at each render
  const handleSelectSlot = useCallback(
    ({ start }: { start: Date }) => {
      const endWithOneHour = addHours(start, 1);
      setTaskModalMode('add');
      setEventSelected({
        id: 0,
        start,
        end: endWithOneHour,
        nameTask: '',
        descriptionTask: '',
      });
      dispatch(actionSwitchTaskModal());
    },
    // We put dispatch in the dependencies array to avoid the linter warning
    // He will never change
    [dispatch]
  );

  const handleSelectEvent = useCallback(
    (event: EventsI) => {
      setTaskModalMode('edit');
      setEventSelected({ ...event });
      dispatch(actionSwitchTaskModal());
    },
    [dispatch]
  );

  const handleEventDrop = useCallback(
    ({ event, startUnserielized, endUnserielized }: DragNDropI) => {
      const start = format(startUnserielized, 'yyyy-MM-dd HH:mm');
      const end = format(endUnserielized, 'yyyy-MM-dd HH:mm');
      dispatch(
        actionModifyTask({
          id: event.id,
          start,
          end,
          nameTask: event.nameTask,
          descriptionTask: event.descriptionTask,
        })
      );
      // setEvents((prev) => {
      //   const filtered = prev.filter((ev) => ev.id !== event.id);
      //   return [...filtered, { ...event, start, end }];
      // });
    },
    [dispatch]
  );

  const handleEventResize = useCallback(
    ({ event, startUnserielized, endUnserielized }: DragNDropI) => {
      const start = format(startUnserielized, 'yyyy-MM-dd HH:mm');
      const end = format(endUnserielized, 'yyyy-MM-dd HH:mm');
      dispatch(
        actionModifyTask({
          id: event.id,
          start,
          end,
          nameTask: event.nameTask,
          descriptionTask: event.descriptionTask,
        })
      );
      // setEvents((prev) => {
      //   const filtered = prev.filter((ev) => ev.id !== event.id);
      //   return [...filtered, { ...event, start, end }];
      // });
    },
    [dispatch]
  );

  const formats = {
    dateFormat: 'd',
    dayFormat: isMobileView ? 'dd' : 'dd eee',
    weekdayFormat: 'cccc',
    timeGutterFormat: 'p',
    monthHeaderFormat: 'MMMM yyyy',
    dayRangeHeaderFormat: (
      { start, end }: { start: Date; end: Date },
      culture: string | undefined,
      localizer: DateLocalizer | undefined
    ) => {
      const s = localizer?.format(start, 'dd MMM', culture);
      const e = localizer?.format(end, 'dd MMM', culture);
      return `${s} - ${e}`;
    },
    dayHeaderFormat: 'cccc do MMM',
    agendaDateFormat: 'ccc MMM dd',
    agendaTimeFormat: 'p',
  };

  return (
    <div className="HomePage">
      {taskModalIsOpen && eventSelected && (
        <Task
          taskModalMode={taskModalMode}
          eventSelect={eventSelected}
          addTask={addTask}
          editTask={editTask}
        />
      )}
      <main>
        <DragNDropCalendar
          localizer={mlocalizer}
          formats={formats}
          defaultView="week"
          culture="fr"
          messages={messages}
          events={events}
          popup
          selectable
          longPressThreshold={5}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventDrop={({ event, start, end }) => {
            const startConverted = new Date(start);
            const endConverted = new Date(end);
            handleEventDrop({
              event,
              startUnserielized: startConverted,
              endUnserielized: endConverted,
            });
          }}
          onEventResize={({ event, start, end }) => {
            const startConverted = new Date(start);
            const endConverted = new Date(end);
            handleEventResize({
              event,
              startUnserielized: startConverted,
              endUnserielized: endConverted,
            });
          }}
          resizable
        />
      </main>
    </div>
  );
}

export default HomePage;
