import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CardCrew from "../../components/CardCrew/CardCrew";
import EventCard from "../../components/EventCard/EventCard";
import "./admin.css";

function Admin() {
  const [events, setEvents] = useState([]);
  const [crews, setCrews] = useState([]);
  const [toggleButtons, setToggleButtons] = useState(true);
  const {updateEvents, setUpdateEvents, updateCrews, setUpdateCrews} = useOutletContext();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events/tovalidate`)
      .then((response) => response.json())
      .then((data) => setEvents(data));
    fetch(`${import.meta.env.VITE_API_URL}/api/crews/tovalidate`)
      .then((response) => response.json())
      .then((data) => setCrews(data));
  }, [updateEvents, updateCrews]);
  console.info(crews);
  return (
    <main className="admin-page-main">
      <h1>Bonjour Administrateur !</h1>
      <div className="button-container-admin-page">
        <button type="button" onClick={() => setToggleButtons(true)}>
          Evènements
        </button>
        <button type="button" onClick={() => setToggleButtons(false)}>
          Collectifs
        </button>
        <ToastContainer />
      </div>
      {toggleButtons && (
        <section className="events-to-validate">
          {events.map((event) => (
            <EventCard
              key={event.id}
              image={event.image}
              name={event.name}
              description={event.description}
              date={event.date}
              startingHour={event.starting_hour}
              id={event.id}
              setUpdateEvents={setUpdateEvents}
              updateEvents={updateEvents}
            />
          ))}
        </section>
      )}
      {!toggleButtons && (
        <section className="crews-to-validate">
          {crews.map((crew) => (
            <CardCrew
              key={crew.id}
              result={crew}
              updateCrews={updateCrews}
              setUpdateCrews={setUpdateCrews}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default Admin;
