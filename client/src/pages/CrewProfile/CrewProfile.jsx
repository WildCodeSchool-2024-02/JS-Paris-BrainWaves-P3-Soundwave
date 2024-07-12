import { useLoaderData, useOutletContext } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./crew-profile.css";
import HeartIconLike from "../../components/HeartIconLike/HeartIconLike";
import EventCard from "../../components/EventCard/EventCard";
import ModalEvent from "../../components/EventCreationModal/ModalEvent";
import AdminButton from "../../components/AdminButtons/AdminButtons";

function CrewProfile() {
  const crew = useLoaderData();
  const { auth } = useOutletContext();
  const [edit, setEdit] = useState(false);
  const [btnValue, setBtnValue] = useState("Éditer");
  const [username, setUsername] = useState(crew.name);
  const [description, setDescription] = useState(crew.description);
  const [errors, setErrors] = useState({});
  const [ValidatedEvents, setValidatedEvents] = useState([]);
  const [UnvalidatedEvents, setUnvalidatedEvents] = useState([]);
  const [openModalEvent, setOpenModalEvent] = useState(false);
  const [toggleEvents, setToggleEvents] = useState(true);
  const [isActiveValidated, setActiveValidated] = useState(false);
  const [isActiveUnValidated, setActiveUnValidated] = useState(false);
  const [image, setImage] = useState(crew.image); // State for image URL
  const imageInputRef = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Update the state with the new image URL
    }
  };

  const handleOpenModal = () => {
    setOpenModalEvent(true);
    document.body.classList.add("active");
  };

  const handleBtnValue = () => {
    setEdit((prevEdit) => !prevEdit);

    if (edit) {
      setBtnValue("Éditer");
    } else {
      setBtnValue("Envoyer");
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

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/crews/${crew.id}/validated-events`
    )
      .then((response) => response.json())
      .then((data) => setValidatedEvents(data));
    fetch(
      `${import.meta.env.VITE_API_URL}/api/crews/${crew.id}/unvalidated-events`
    )
      .then((response) => response.json())
      .then((data) => setUnvalidatedEvents(data));
  }, [crew.id]);

  const handleSubmit = async () => {
    const errorData = validate();
    if (Object.keys(errorData).length > 0) {
      setErrors(errorData);
    } else {
      try {
        const form = new FormData();
        form.append("name", username);
        form.append("description", description);
        if (imageInputRef.current.files[0]) {
          form.append("image", imageInputRef.current.files[0]);
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/crews/${crew.id}`,
          {
            method: "put",
            headers: { Authorization: `Bearer ${auth.token}` },
            body: form,
          }
        );
        if (response.status === 200) {
          const result = await response.json();
          setUsername(result.name);
          setDescription(result.description);
          setImage(result.image);
          setEdit(false);
          setBtnValue("Éditer");
        } else {
          setErrors({ update: "Échec de la mise à jour" });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // switch the display of the events.
  const handleToggleValidated = () => {
    setToggleEvents(true);
    setActiveValidated(true);
    setActiveUnValidated(false);
  };
  const handleToggleUnValidated = () => {
    setToggleEvents(false);
    setActiveValidated(false);
    setActiveUnValidated(true);
  };

  return (
    <main className="main-crew-profile">
      <section className="header-crew-profile">
        <div className="header-crew-image">
          <img src={image} alt="logo du collectif" />
          {edit && (
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleImageChange}
            />
          )}
        </div>
        <div className="crew-profile-title-options">
          {!edit ? (
            <h1>{username}</h1>
          ) : (
            <input
              className="input-crew-edit"
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              value={username}
            />
          )}
          {auth?.user?.role === "crew" && !crew.isValidated && <p className="admin-comment">Raison du refus par l'administrateur : {crew.comment}</p>}
          <div className="button-container-crew-profile">
            {auth?.user?.role !== "crew" || auth?.user?.role === "admin" && <HeartIconLike />}
            {auth.isLogged && auth?.user?.role === "crew" && (
              <button
                onClick={edit ? handleSubmit : handleBtnValue}
                type="button"
              >
                {btnValue}
              </button>
            )}
            {auth.isLogged &&
              auth.user?.role === "admin" &&
              !crew.is_validated && <AdminButton id={crew.id} type="crew" />}
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
            className="textarea-crew-edit"
            onChange={handleInputChange}
            value={description}
          />
        </section>
      )}
      {errors.username && <p className="error">{errors.username}</p>}
      {errors.description && <p className="error">{errors.description}</p>}
      {errors.update && <p className="error">{errors.update}</p>}

      <section className="events-crew-profile">
        <div className="events-crew-profile-title">
          <div className="title-add-btn-container">
            <h2>Evènements</h2>
            {auth.isLogged && auth.user.role === "crew" && (
              <button type="button" onClick={handleOpenModal}>
                Ajouter
              </button>
            )}
          </div>
          {auth.isLogged && auth.user.role === "crew" && (
            <div className="button-container-events-status">
              <button
                onClick={handleToggleValidated}
                className={
                  !isActiveValidated
                    ? "button-events-status"
                    : "button-events-status active"
                }
              >
                Validés
              </button>
              <button
                onClick={handleToggleUnValidated}
                className={
                  !isActiveUnValidated
                    ? "button-events-status"
                    : "button-events-status active"
                }
              >
                Non Validés
              </button>
            </div>
          )}
          {openModalEvent && (
            <ModalEvent closeModal={setOpenModalEvent} id={crew.id} />
          )}
        </div>
        {toggleEvents
          ? ValidatedEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                image={event.image}
                name={event.name}
                description={event.description}
                date={event.date}
                startingHour={event.starting_hour}
                isValidated={event.is_validated}
                type="event"
              />
            ))
          : auth.isLogged &&
            auth.user.role === "crew" &&
            UnvalidatedEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                image={event.image}
                name={event.name}
                description={event.description}
                date={event.date}
                startingHour={event.starting_hour}
                isValidated={event.is_validated}
                comment={event.comment}
                type="event"
              />
            ))}
      </section>
    </main>
  );
}

export default CrewProfile;
