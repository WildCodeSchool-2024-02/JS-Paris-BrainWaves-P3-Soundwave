import { useLoaderData, useOutletContext } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import "./eventdetails.css";
import AdminButton from "../../components/AdminButtons/AdminButtons";

function EventDetail() {
  const event = useLoaderData();
  const {admin, updateEvents, setUpdateEvents} = useOutletContext();

  return (
    <main className="main-event-details">
      <div className="event-details-container">
        <div className="details-img-container">
          <img src={event.image} alt="poster" className="event-details-img" />
        </div>
        <section className="event-details-info">
          {!admin ? (
            <AdminButton id={event.id} updateEvents={updateEvents} setUpdateEvents={setUpdateEvents}/>
          ) : (
            <div className="heart-icon-container">
              <FaRegHeart className="heart-icon" />
            </div>
          )}
          <div className="event-main-info">
            <h1>{event.name}</h1>
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
