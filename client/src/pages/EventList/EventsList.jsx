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
      for (let index = 0; index < 11; index += 1) {
        filteredEvents[index] = data.filter((event) => {
          const month = new Date(event.date).getMonth();
          return month === index;
        });
      }
      setEvents(filteredEvents);
    }
    filterEventsByMonth();
  }, []);

  return (
    <main>
      <div className="event-list-container">
        <img src={data[2].image} alt="" className="event-page-img" />
        <h1 className="title-txt-list">Trouve ta soirée pour t'éclater</h1>
        <section className="event-title-section">
          <h2>Événements</h2>
        </section>
        <div className="card-event-content">
          {events.map(
            (eventList, index) =>
              eventList.length > 0 && (
                <>
                  <h3>{months[index]}</h3>
                  {eventList.map((event) => (
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
                </>
              )
          )}
        </div>
      </div>
    </main>
  );
}

export default EventsList;
