import { useLoaderData, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import "./crew-profile.css";
import { FaRegHeart } from "react-icons/fa";
import EventCard from "../../components/EventCard/EventCard";
import ModalEvent from "../../components/EventCreationModal/ModalEvent";
import AdminButton from "../../components/AdminButtons/AdminButtons";

function CrewProfile() {
  const crew = useLoaderData();
  const { auth } = useOutletContext();
  const [login] = useState(false);
  const [edit, setEdit] = useState(false);
  const [btnValue, setBtnValue] = useState("editer");
  const [username, setUsername] = useState(crew.name);
  const [description, setDescription] = useState(crew.description);
  const [errors, setErrors] = useState({});
  const [events, setEvents] = useState([]);
  const [openModalEvent, setOpenModalEvent] = useState(false);

  const handleOpenModal = () => {
    setOpenModalEvent(true);
    document.body.classList.add("active");
  };

  const handleBtnValue = () => {
    setEdit((prevEdit) => !prevEdit);

    if (edit) {
      setBtnValue("editer");
    } else {
      setBtnValue("envoyer");
    }
  };

  const handleInputChange = (event) => {
    const textarea = event.target;
    textarea.style.height = ""; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust the height based on the content
    setDescription(textarea.value); // Update the state with the textarea value
  };

  const validate = () => {
    const error = {};
    if (!username) {
      error.username = "Nom d'utilisateur requis";
    }

    if (!description) {
      error.description = "Description requise";
    }

    return error;
  };

  async function updateCrewData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/crews/${crew.id}`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: username, description }),
        }
      );
      if (response.status === 200) {
        const result = await response.json();
        setUsername(result.name);
        setDescription(result.description);
        setEdit(false);
        setBtnValue("editer");
      } else {
        setErrors({ update: "Échec de la mise à jour" });
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/crews/${crew.id}/events`)
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, [crew.id]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const errorData = validate();
    if (Object.keys(errorData).length > 0) {
      setErrors(errorData);
    } else {
      await updateCrewData();
    }
  };

  return (
    <main className="main-crew-profile">
      <section className="header-crew-profile">
        <img src={crew.image} alt="logo du collectif" />
        <div className="crew-profile-title-options">
          {!edit ? (
            <h1>{username}</h1>
          ) : (
            <input
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              value={username}
            />
          )}
          <div className="button-container-crew-profile">
            {login && <FaRegHeart className="heart-icon" />}
            <button
              onClick={edit ? handleSubmit : handleBtnValue}
              type="button"
            >
              {btnValue}
            </button>
            {auth.isLogged &&
              auth.user.role === "admin" &&
              !crew.is_validated && <AdminButton id={crew.id} />}
          </div>
        </div>
      </section>

      {!edit ? (
        <section className="desc-crew-profile">
          <h2>Description</h2>
          <p>{description}</p>
        </section>
      ) : (
        <section className="desc-crew-profile">
          <textarea
            className="input-description-crew-profile"
            onChange={handleInputChange}
            style={{
              height: "auto",
              minHeight: "10rem",
              width: "50rem",
              minWidth: "10rem",
            }}
            value={description}
          />
        </section>
      )}
      {errors.username && <p className="error">{errors.username}</p>}
      {errors.description && <p className="error">{errors.description}</p>}
      {errors.update && <p className="error">{errors.update}</p>}

      <section className="events-crew-profile">
        <div className="events-crew-profile-title">
          <h2>Evènements</h2>
          {!login && (
            <button type="button" onClick={handleOpenModal}>
              Ajouter
            </button>
          )}
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
            isValidated={event.is_validated}
          />
        ))}
      </section>
    </main>
  );
}

export default CrewProfile;
