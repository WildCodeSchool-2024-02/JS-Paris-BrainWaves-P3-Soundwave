import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import CardCrew from "../../components/CardCrew/CardCrew";
import EventCard from "../../components/EventCard/EventCard";
import ModalValidation from "../../components/ModalValidation/ModalValidation";
import "./admin.css";
import "react-toastify/dist/ReactToastify.css";

function Admin() {
  const [events, setEvents] = useState([]);
  const [crews, setCrews] = useState([]);
  const [toggleButtons, setToggleButtons] = useState(true);
  const [openValidation, setOpenValidation] = useState(false);
  const [text, setText] = useState(false);
  const [validationId, setValidationId] = useState("");
  const { auth, updateEvents, updateCrews } = useOutletContext();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events/tovalidate`, {
      headers: { Authorization: ` Bearer ${auth.token}` },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setEvents(data));
    fetch(`${import.meta.env.VITE_API_URL}/api/crews/tovalidate`, {
      headers: { Authorization: ` Bearer ${auth.token}` },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setCrews(data));
  }, [updateEvents, updateCrews]);
  return (
    <main className="admin-page-main">
      <h1 className="admin-page-title">Bonjour {auth.user.firstname} !</h1>
      <div className="button-container-admin-page">
        <button type="button" onClick={() => setToggleButtons(true)}>
          Evènements
        </button>
        <button type="button" onClick={() => setToggleButtons(false)}>
          Collectifs
        </button>
      </div>
      {toggleButtons && (
        <section className="events-to-validate">
          {events.map((event) => (
            <EventCard
              key={event.id}
              image={event.image}
              name={event.name}
              description={event.description}
              date={event.date}
              startingHour={event.starting_hour}
              id={event.id}
              setOpenValidation={setOpenValidation}
              setText={setText}
              setValidationId={setValidationId}
            />
          ))}
        </section>
      )}
      {!toggleButtons && (
        <section className="crews-to-validate">
          {crews.map((crew) => (
            <CardCrew
              key={crew.id}
              result={crew}
              setOpenValidation={setOpenValidation}
              setText={setText}
              setValidationId={setValidationId}
            />
          ))}
        </section>
      )}
      {openValidation && (
        <ModalValidation
          setOpenValidation={setOpenValidation}
          text={text}
          validationId={validationId}
        />
      )}
    </main>
  );
}

export default Admin;
