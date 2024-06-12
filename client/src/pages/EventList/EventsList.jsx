import { useLoaderData } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard";
import "./eventlist.css";

function EventsList() {
  const data = useLoaderData();

  return (
    <div className="event-list-container">
      <h1>Trouve ta soirée pour t'éclater</h1>
      <section className="event-title-section">
        <h2>Événements</h2>
      </section>
      <div className="card-event-content">
        {data.map((eventList) => (
          <EventCard
            key={eventList.id}
            image={eventList.image}
            name={eventList.name}
            description={eventList.description}
            date={eventList.date}
            startingHour={eventList.starting_hour}
          />
        ))}
      </div>
    </div>
  );
}

export default EventsList;
