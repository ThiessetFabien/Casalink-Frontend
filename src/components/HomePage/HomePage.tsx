import { Children, cloneElement, useEffect, useRef, useState } from 'react';
import { Calendar, DateLocalizer, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { useDispatch } from 'react-redux';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
import { addHours } from 'date-fns';

import './HomePage.scss';
import Task from '../Modals/Task/Task';
import { useAppSelector } from '../../hooks/redux';
import { actionSwitchTaskModal } from '../../store/reducer/modal';

const locales = {
  fr,
};

const mlocalizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const messages = {
  allDay: 'Toute la journée',
  previous: 'Précédent',
  next: 'Suivant',
  today: "Aujourd'hui",
  month: 'Mois',
  week: 'Semaine',
  day: 'Jour',
  agenda: 'Agenda',
  date: 'Date',
  time: 'Heure',
  event: 'Événement',
  showMore: (total: number) => `+ ${total}`,
};

interface EventsI {
  id: number;
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

interface DateEventI {
  start: Date;
  end: Date;
}

const DragNDropCalendar = withDragAndDrop<EventsI>(Calendar);

function HomePage() {
  const [events, setEvents] = useState<EventsI[]>([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [eventSelected, setEventSelected] = useState<null | DateEventI>(null);
  const taskModalIsOpen = useAppSelector(
    (state) => state.modal.taskModalIsOpen
  );

  const dispatch = useDispatch();

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

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const endWithOneHour = addHours(start, 1);
    setEventSelected({ start, end: endWithOneHour });
    dispatch(actionSwitchTaskModal());
  };

  const handleSelectEvent = (event: EventsI) => {
    console.log(event.title);
    console.log(event.content);
  };

  const handleEventDrop = ({ event, start, end }: DragNDropI) => {
    setEvents((prev) => {
      const filtered = prev.filter((ev) => ev.id !== event.id);
      return [...filtered, { ...event, start, end }];
    });
  };

  const handleEventResize = ({ event, start, end }: DragNDropI) => {
    setEvents((prev) => {
      const filtered = prev.filter((ev) => ev.id !== event.id);
      return [...filtered, { ...event, start, end }];
    });
  };

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
        <Task eventSelect={eventSelected} addTask={addTask} />
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
