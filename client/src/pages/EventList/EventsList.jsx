import { useRef, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import videoBanner from "../../assets/video-accueil-event.mov";
import EventCard from "../../components/EventCard/EventCard";
import "./eventlist.css";

function EventsList() {
  const data = useLoaderData();
  const [events, setEvents] = useState([]);
  const videoRef = useRef(null);
  const playbackSpeed = 0.8;

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  return (
    <main>
      <div className="event-list-container">
        <video
          ref={videoRef}
          src={videoBanner}
          className="event-page-img"
          muted
          loop
          autoPlay
          playsInline
        >
          Your browser does not support the video tag.
        </video>
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
                      event={event}
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
