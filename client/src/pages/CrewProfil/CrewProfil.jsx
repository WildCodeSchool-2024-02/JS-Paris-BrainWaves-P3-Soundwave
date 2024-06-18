import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import "./crew-profil.css";
import { FaRegHeart } from "react-icons/fa";
import { TiTick, TiTimes } from "react-icons/ti";
import EventCard from "../../components/EventCard/EventCard";

function CrewProfil() {
  const crew = useLoaderData();
  const [login] = useState(false);
  const [admin] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/crews/${crew.id}/events`)
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <main className="main-crew-profil">
      <section className="header-crew-profil">
        <img src={crew.image} alt="logo du collectif" />
        <div className="crew-profil-title-options">
          <h1>{crew.name}</h1>
          <div className="button-container-crew-profil">
            {login && <FaRegHeart className="heart-icon" />}
            {!login && <button type="button">Editer</button>}
            {admin && (
              <div className="evaluate-admin-buttons">
                <TiTick role="button" />
                <TiTimes role="button" />
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="desc-crew-profil">
        <h2>Description</h2>
        <p>{crew.description}</p>
      </section>
      <section className="events-crew-profil">
        <div className="events-crew-profil-title">
          <h2>Evènements</h2>
          {!login && <button type="button">Ajouter</button>}
        </div>
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            image={event.image}
            name={event.name}
            description={event.description}
            date={event.date}
            startingHour={event.starting_hour}
          />
        ))}
      </section>
    </main>
  );
}

export default CrewProfil;
