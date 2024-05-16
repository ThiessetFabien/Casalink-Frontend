import { useEffect, useRef, useState } from 'react';
import { Calendar, DateLocalizer, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop, {
  withDragAndDropProps,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';

import './HomePage.scss';

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
  showMore: (total: number) => `+ ${total} événement(s) supplémentaire(s)`,
};

interface EventsI {
  id: number;
  title: string;
  content: string | null;
  start: Date;
  end: Date;
}

function HomePage() {
  const [events, setEvents] = useState<EventsI[]>([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const calendarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resite', handleResize);
    };
  }, []);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt('Quel est le nom de la tâche');
    const content = window.prompt('Quel est la description de la tâche');
    if (title)
      setEvents((prev) => [...prev, { id: 1, start, end, title, content }]);
  };

  const handleSelectEvent = (event: EventsI) => {
    console.log(event.title);
    console.log(event.content);
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
      <main ref={calendarRef}>
        <Calendar
          localizer={mlocalizer}
          formats={formats}
          defaultView="week"
          selectable
          culture="fr"
          messages={messages}
          events={events}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
        />
      </main>
    </div>
  );
}

export default HomePage;
