import './HomePage.scss';

function HomePage() {
  return (
    <div className="HomePage">
      <section>
        <div>
          <button type="button">Membres</button>
        </div>
        <div>
          <button type="button">Tâches</button>
          <ul>
            <li>Tâches du foyer: </li>
            <li>Tâches à effectuer aujourd'hui</li>
          </ul>
        </div>
        <div>
          <button type="button">Priorités</button>
          <p>Tâches importantes du foyer</p>
        </div>
        <div>
          <button type="button">Préférences</button>
        </div>
      </section>
      <main>
        
      </main>
    </div>
  );
}

export default HomePage;
