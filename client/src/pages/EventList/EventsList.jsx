import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard";
import "./eventlist.css";

function EventsList() {
  const data = useLoaderData();
  const [events, setEvents] = useState([]);
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];

  useEffect(() => {
    function filterEventsByMonth() {
      const filteredEvents = [];
      for (let index = 0; index < 12; index += 1) {
        filteredEvents[index] = data.filter((event) => {
          const month = new Date(event.date).getMonth();
          return month === index;
        });
      }
      setEvents(filteredEvents);
    }
    filterEventsByMonth();
  }, [data]);
  return (
    <main>
      <div className="event-list-container">
        <img src={data[1].image} alt="" className="event-page-img" />
        <h1 className="title-txt-list">Trouve ta soirée pour t'éclater</h1>
        <section className="event-title-section">
          <h2>Évènements</h2>
        </section>
        <div className="card-event-content">
          {events.map(
            (eventList, index) =>
              eventList.length > 0 && (
                <>
                  <div className="month-event">
                    <h3>{months[index]}</h3>
                  </div>
                  {eventList.map((event) => (
                    <EventCard
                      key={event.id}
                      id={event.id}
                      image={event.image}
                      name={event.name}
                      description={event.description}
                      date={event.date}
                      startingHour={event.starting_hour}
                      isValidated={event.is_validated}
                      event= {event}
                    />
                  ))}
                </>
              )
          )}
        </div>
      </div>
    </main>
  );
}

export default EventsList;
