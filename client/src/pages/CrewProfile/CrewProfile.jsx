import { useLoaderData, useOutletContext, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./crew-profile.css";
import EventCard from "../../components/EventCard/EventCard";
import ModalEvent from "../../components/EventCreationModal/ModalEvent";
import AdminButton from "../../components/AdminButtons/AdminButtons";
import ModalValidation from "../../components/ModalValidation/ModalValidation";
import HeartIconFollowCrews from "../../components/HeartIconFollowCrews/HeartIconFollowCrews";

function CrewProfile() {
  const crewData = useLoaderData();
  const { auth, setType, updateEvents } = useOutletContext();
  const [edit, setEdit] = useState(false);
  const [btnValue, setBtnValue] = useState("Éditer");
  const [username, setUsername] = useState(crewData.name);
  const [description, setDescription] = useState(crewData.description);
  const [errors, setErrors] = useState({});
  const [ValidatedEvents, setValidatedEvents] = useState([]);
  const [UnvalidatedEvents, setUnvalidatedEvents] = useState([]);
  const [openModalEvent, setOpenModalEvent] = useState(false);
  const [toggleEvents, setToggleEvents] = useState(true);
  const [isActiveValidated, setActiveValidated] = useState(false);
  const [isActiveUnValidated, setActiveUnValidated] = useState(false);
  const [image, setImage] = useState(crewData.image); // State for image URL
  const [openValidation, setOpenValidation] = useState(false);
  const [text, setText] = useState(false);
  const imageInputRef = useRef();
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(null); // New state for selected image

  setType("crew");

  // Function to handle image change when user selects a new image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl); // Update the selected image state
    }
  };

  // Function to handle opening the modal for adding new events
  const handleOpenModal = () => {
    setOpenModalEvent(true);
    document.body.classList.add("active");
  };

  // Function to handle toggling between edit mode and normal mode
  const handleBtnValue = () => {
    setEdit((prevEdit) => !prevEdit);

    if (edit) {
      setBtnValue("Éditer");
    } else {
      setBtnValue("Envoyer");
    }
  };

  // Function to handle input change for the description textarea
  const handleInputChange = (event) => {
    const textarea = event.target;
    textarea.style.height = ""; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust the height based on the content
    setDescription(textarea.value); // Update the state with the textarea value
  };

  // Function to validate form inputs
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

  // Effect to fetch validated and unvalidated events when crewData.id changes
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/crews/${crewData.id}/validated-events`
    )
      .then((response) => response.json())
      .then((data) => setValidatedEvents(data));
    fetch(
      `${import.meta.env.VITE_API_URL}/api/crews/${crewData.id}/unvalidated-events`
    )
      .then((response) => response.json())
      .then((data) => setUnvalidatedEvents(data));
  }, [crewData.id, updateEvents]);

  // Function to handle form submission
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
          `${import.meta.env.VITE_API_URL}/api/crews/${crewData.id}`,
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

  // Function to handle toggling between validated and non-validated events
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
          <figure
            className={
              edit
                ? "display-avatar-profile display-avatar-default"
                : "display-avatar-default"
            }
            role="presentation"
            onClick={() => {
              if (edit) imageInputRef.current.click();
            }}
          >
            {!edit ? (
              <img
                src={image}
                alt="avatar-profile"
                className="avatar-client-change"
              />
            ) : (
              <>
                <img
                  src={selectedImage || image}
                  alt="avatar-profile"
                  className="avatar-client-change"
                  role="presentation"
                />
                <input
                  type="file"
                  hidden
                  ref={imageInputRef}
                  onChange={handleImageChange}
                />
              </>
            )}
          </figure>
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
          {auth?.crew?.id === Number(params.id) &&
            crewData.is_validated === 0 && (
              <p className="admin-comment">
                Modification(s) demandée(s) par l'administrateur :{" "}
                {crewData.comment}
              </p>
            )}
          <div className="button-container-crew-profile">
            {auth?.user?.role === "client" && (
              <HeartIconFollowCrews crew={crewData} />
            )}
            {auth.isLogged && auth?.crew?.id === Number(params.id) && (
              <button
                onClick={edit ? handleSubmit : handleBtnValue}
                type="button"
              >
                {btnValue}
              </button>
            )}
            {auth.isLogged &&
              auth.user?.role === "admin" &&
              !crewData.is_validated && (
                <AdminButton
                  id={crewData.id}
                  setText={setText}
                  setOpenValidation={setOpenValidation}
                />
              )}
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
            <h2>Nos Évènements</h2>
            {auth?.crew?.id === Number(params.id) && (
              <button type="button" onClick={handleOpenModal}>
                Ajouter
              </button>
            )}
          </div>
          {auth?.crew?.id === Number(params.id) && (
            <div className="button-container-events-status">
              <button
                type="button"
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
                type="button"
                onClick={handleToggleUnValidated}
                className={
                  !isActiveUnValidated
                    ? "button-events-status"
                    : "button-events-status active"
                }
              >
                Refusés
              </button>
            </div>
          )}
          {openModalEvent && (
            <ModalEvent closeModal={setOpenModalEvent} id={crewData.id} />
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
                event={event}
              />
            ))
          : auth?.crew?.id === Number(params.id) &&
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
                event={event}
              />
            ))}
      </section>
      {openValidation && (
        <ModalValidation
          setOpenValidation={setOpenValidation}
          text={text}
          validationId={crewData.id}
        />
      )}
    </main>
  );
}
export default CrewProfile;
