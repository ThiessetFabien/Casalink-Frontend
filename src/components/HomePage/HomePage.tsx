import { useMemo, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';

import './HomePage.scss';

const locales = {
  fr,
};

const localizer = dateFnsLocalizer({
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

function HomePage() {
  const [events, setEvents] = useState([
    {
      title: 'Rendez-vous',
      start: new Date(2024, 4, 15, 14, 0),
      end: new Date(2024, 4, 15, 14, 0),
      allDay: false,
    },
  ]);
  return (
    <div className="HomePage">
      <section>
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
          <p className="category_infos">Tâches à effectuer aujourd'hui</p>
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
        <Calendar
          localizer={localizer}
          defaultView="week"
          style={{ height: '100vh' }}
          selectable
          culture="fr"
          messages={messages}
        />
      </main>
    </div>
  );
}

export default HomePage;
