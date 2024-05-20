import { useCallback, useEffect, useState } from 'react';
import { Calendar, DateLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { addHours } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actionSwitchTaskModal } from '../../store/reducer/modal';

import './HomePage.scss';
import Task from '../Modals/Task/Task';
import { mlocalizer, messages } from '../../utils/calendarParams';

interface EventsI {
  id?: number;
  title: string;
  content: string | null;
  start: Date;
  end: Date;
}

interface DragNDropI {
  event: EventsI;
  start: Date;
  end: Date;
}

const DragNDropCalendar = withDragAndDrop<EventsI>(Calendar);

function HomePage() {
  const [events, setEvents] = useState<EventsI[]>([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [eventSelected, setEventSelected] = useState<null | EventsI>(null);
  const [taskModalMode, setTaskModalMode] = useState<'add' | 'edit'>('add');
  const taskModalIsOpen = useAppSelector(
    (state) => state.modal.taskModalIsOpen
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

  const addTask = (start: Date, end: Date, title: string, content: string) => {
    setEvents((prev) => [
      ...prev,
      { id: events.length, start, end, title, content },
    ]);
    dispatch(actionSwitchTaskModal());
  };

  const editTask = (
    id: number,
    start: Date,
    end: Date,
    title: string,
    content: string
  ) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id === id) return { ...event, start, end, title, content };
        return event;
      })
    );
    dispatch(actionSwitchTaskModal());
  };

  // We put a useCallback to avoid the function recreation at each render
  const handleSelectSlot = useCallback(
    ({ start }: { start: Date }) => {
      const endWithOneHour = addHours(start, 1);
      setTaskModalMode('add');
      setEventSelected({ start, end: endWithOneHour, title: '', content: '' });
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
    ({ event, start, end }: DragNDropI) => {
      setEvents((prev) => {
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...event, start, end }];
      });
    },
    [setEvents]
  );

  const handleEventResize = useCallback(
    ({ event, start, end }: DragNDropI) => {
      setEvents((prev) => {
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...event, start, end }];
      });
    },
    [setEvents]
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
      {taskModalIsOpen && (
        <Task
          taskModalMode={taskModalMode}
          eventSelect={eventSelected}
          addTask={addTask}
          editTask={editTask}
        />
      )}
      <section>
        <div className="category">
          <button className="category_btn" type="button">
            Foyer
          </button>
        </div>
        <div className="category">
          <button className="category_btn" type="button">
            Membres
          </button>
        </div>
        <div className="category">
          <button className="category_btn" type="button">
            Tâches
          </button>
          <p className="category_infos">Tâches du foyer: </p>
          <p className="category_infos">Tâches à effectuer aujourd&apos;hui</p>
        </div>
        <div className="category">
          <button className="category_btn" type="button">
            Priorités
          </button>
          <p className="category_infos">Tâches importantes du foyer</p>
        </div>
        <div className="category">
          <button className="category_btn" type="button">
            Préférences
          </button>
        </div>
      </section>
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
              start: startConverted,
              end: endConverted,
            });
          }}
          onEventResize={({ event, start, end }) => {
            const startConverted = new Date(start);
            const endConverted = new Date(end);
            handleEventResize({
              event,
              start: startConverted,
              end: endConverted,
            });
          }}
          resizable
        />
      </main>
    </div>
  );
}

export default HomePage;
