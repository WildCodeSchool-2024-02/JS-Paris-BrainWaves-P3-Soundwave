import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import "./eventdetails.css";

function EventDetail() {
  const event = useLoaderData();
  const navigate = useNavigate();
  const [crewByEvent, setCrewByEvent] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events/${event.id}/crew`)
      .then((response) => response.json())
      .then((data) => setCrewByEvent(data));
  }, [event.id]);

  const handleCrewPage = () => {
    navigate(`/crew-details/${crewByEvent.id}`);
  };

  return (
    <main className="main-event-details">
      <div className="event-details-container">
        <div className="details-img-container">
          <img src={event.image} alt="poster" className="event-details-img" />
        </div>
        <section className="event-details-info">
          <p onClick={handleCrewPage} onKeyDown={handleCrewPage} role= "presentation" className="crew-name-event">Powerd by: {crewByEvent.name}</p>
          <div className="heart-icon-details-container">
            <FaRegHeart className="heart-icon" />
            <h1>{event.name}</h1>
          </div>
          <div className="event-main-info">
            <p className="date-hour">
              {event.date.slice(0, 10)} | {event.starting_hour.slice(0, 5)}
            </p>
            <p>Adresse: {event.address}</p>
            <p>{event.lineup}</p>
          </div>
          <h2>Description</h2>
          <p className="event-details-description">{event.description}</p>
          <p>ajout de la map pour adresse</p>
        </section>
      </div>
    </main>
  );
}

export default EventDetail;
