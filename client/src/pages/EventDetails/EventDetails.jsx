import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import HeartIconLike from "../../components/HeartIconLike/HeartIconLike";
import "./eventdetails.css";
import AdminButton from "../../components/AdminButtons/AdminButtons";

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

  const { auth } = useOutletContext();

  return (
    <main className="main-event-details">
      <div className="event-details-container">
        <div className="details-img-container">
          <img src={event.image} alt="poster" className="event-details-img" />
        </div>
        <section className="event-details-info">
          <p
            onClick={handleCrewPage}
            onKeyDown={handleCrewPage}
            role="presentation"
            className="crew-name-event"
          >
            Collectifs : {crewByEvent.name}
          </p>
          <section className="heart-title-container">
          <h1>{event.name}</h1>
          {auth.isLogged &&
          auth.user.role === "admin" &&
          !event.is_validated ? (
            <AdminButton id={event.id} type="event" />
          ) : (
            <div className="heart-icon-container">
              <HeartIconLike  event = {event}/>
            </div>
          )}
          </section>
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
