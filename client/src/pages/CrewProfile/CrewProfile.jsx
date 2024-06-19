import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import "./crew-profile.css";
import { FaRegHeart } from "react-icons/fa";
import { TiTick, TiTimes } from "react-icons/ti";
import EventCard from "../../components/EventCard/EventCard";
import ModalEvent from "../../EventCreationModal/ModalEvent";


function CrewProfile() {
  const crew = useLoaderData();
  const [login] = useState(false);
  const [admin] = useState(false);
  const [events, setEvents] = useState([]);
  const [openModalEvent, setOpenModalEvent] = useState(false);

  const handleOpenModal = () => {
    setOpenModalEvent(true);
  };



  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/crews/${crew.id}/events`)
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <main className="main-crew-profile">
      <section className="header-crew-profile">
        <img src={crew.image} alt="logo du collectif" />
        <div className="crew-profile-title-options">
          <h1>{crew.name}</h1>
          <div className="button-container-crew-profile">
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
      <section className="desc-crew-profile">
        <h2>Description</h2>
        <p>{crew.description}</p>
      </section>
      <section className="events-crew-profile">
        <div className="events-crew-profile-title">
          <h2>Evènements</h2>
          {!login && <button type="button" onClick={handleOpenModal}>Ajouter</button>}
          {openModalEvent && <ModalEvent closeModal={setOpenModalEvent} />}
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

export default CrewProfile;