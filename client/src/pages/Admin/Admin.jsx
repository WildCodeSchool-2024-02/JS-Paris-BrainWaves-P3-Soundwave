import { useEffect, useState } from "react";
import CardCrew from "../../components/CardCrew/CardCrew";
import EventCard from "../../components/EventCard/EventCard";
import "./admin.css";

function Admin() {
  const [events, setEvents] = useState([]);
  const [crews, setCrews] = useState([]);
  const [toggleButtons, setToggleButtons] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events`)
      .then((response) => response.json())
      .then((data) => setEvents(data));
    fetch(`${import.meta.env.VITE_API_URL}/api/crews`)
      .then((response) => response.json())
      .then((data) => setCrews(data));
  }, []);

  return (
    <main className="admin-page-main">
      <h1>Bonjour Administrateur !</h1>
      <div className="button-container-admin-page">
        <button type="button" onClick={() => setToggleButtons(true)}>Evènements</button>
        <button type="button" onClick={() => setToggleButtons(false)}>Collectifs</button>
      </div>
     {toggleButtons && <section className="events-to-validate">
        {events.map((event) => (
          <EventCard
            key={event.id}
            image={event.image}
            name={event.name}
            description={event.description}
            date={event.date}
            startingHour={event.starting_hour}
            id={event.id}
          />
        ))}
      </section>}
     {!toggleButtons && <section className="crews-to-validate">
        {crews.map((crew) => (
          <CardCrew key={crew.id} result={crew} />
        ))}
      </section>}
    </main>
  );
}

export default Admin;
