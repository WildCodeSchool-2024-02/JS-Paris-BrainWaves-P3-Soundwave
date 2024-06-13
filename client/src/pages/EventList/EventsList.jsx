import { useLoaderData } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard";
import "./eventlist.css";

function EventsList() {
  const data = useLoaderData();

  const sortDates = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA > dateB) return 1;
    if (dateA < dateB) return -1;
    return 0;
  };

  return (
    <main>
      <div className="event-list-container">
        <img src={data[2].image} alt="" className="event-page-img" />
        <h1 className="title-txt-list">Trouve ta soirée pour t'éclater</h1>
        <section className="event-title-section">
          <h2>Événements</h2>
        </section>
        <div className="card-event-content">
          {data.sort(sortDates).map((eventList) => (
            <EventCard
              key={eventList.id}
              id={eventList.id}
              image={eventList.image}
              name={eventList.name}
              description={eventList.description}
              date={eventList.date}
              startingHour={eventList.starting_hour}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default EventsList;
