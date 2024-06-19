import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
import Mascot from "../assets/images/masquote.svg";
import "./modalevent.css";

function ModalEvent({ closeModal }) {
  const name = useRef("");
  const date = useRef("");
  const startingHour = useRef("");
  const location = useRef("");
  const address = useRef("");
  const description = useRef("");
  const image = useRef("");
  const lineup = useRef("");
  const [formErrors, setFormErrors] = useState([]);

  const handleCloseModal = () => {
    closeModal(false);
  };

  const validateForm = () => {
    const error = {};

    if (!name.current.value) {
      error.name = "Nom obligatoire";
    } else if (name.current.value.length >= 255) {
      error.name = "Le nom ne peux pas dépasser 255 charactères";
    }

    if (!date.current.value) {
      error.date = "Date obligatoire";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(date.current.value)) {
      error.date = "Utiliser le bon format YYYY-MM-DD";
    }

    if (!startingHour.current.value) {
      error.startingHour = "Heure de début obligatoire ";
    } else if (
      !/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(startingHour.current.value)
    ) {
      error.startingHour = "utliser le bon format xx:xx:xx";
    }

    if (!address.current.value) {
      error.address = "Adresse obligatoire";
    }

    if (!description.current.value) {
      error.description = "Description de l'événement obligatoire";
    }

    if (!image.current.value) {
      error.image = "Image  obligatoire";
    }

    if (!lineup.current.value) {
      error.lineup = "Programmation obligatoire";
    }

    return error;
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.current.value,
            date: date.current.value,
            starting_hour: startingHour.current.value,
            location: location.current.value,
            address: address.current.value,
            description: description.current.value,
            image: image.current.value,
            lineup: lineup.current.value,
          }),
        }
      );
      if (response.status === 200) {
        navigate(`/events-list`);
      } else {
        const errors = validateForm();
        setFormErrors(errors);
        console.error("erreur client");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <dialog className="display-modal-event">
      <section className="section-modal-event">
        <ImCross className="btn-close-modal-event" onClick={handleCloseModal} />
        <img src={Mascot} alt="mascot logo" />
        <h1>Crée ton événement</h1>
        <form className="section-event">
          <label htmlFor="text">Nom</label>
          <input placeholder="Nom de l'événement" ref={name} />
          {formErrors.name && <p>* {formErrors.name}</p>}
          <label htmlFor="date">Date</label>
          <input type="text" placeholder="ex: YYYY-MM-DD" ref={date} />
          {formErrors.date && <p>* {formErrors.date}</p>}
          <label htmlFor="hour">Heure</label>
          <input type="text" placeholder="ex: 23:00:00" ref={startingHour} />
          {formErrors.startingHour && <p>* {formErrors.startingHour} </p>}
          <label htmlFor="location">Localisation</label>
          <input type="text" placeholder="Rex Club" ref={location} />
          <label htmlFor="address">Adresse</label>
          <input type="text" placeholder="12 rue du bac Paris" ref={address} />
          {formErrors.address && <p>* {formErrors.address}</p>}
          <label htmlFor="image">Image</label>
          <input type="text" ref={image} />
          {formErrors.image && <p>* {formErrors.image}</p>}
          <label htmlFor="lineup">Line-Up</label>
          <input type="text" placeholder="ex: XXXX, XXXX" ref={lineup} />
          {formErrors.lineup && <p>* {formErrors.lineup}</p>}
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Met t'a description de l'événement"
            ref={description}
          />
          {formErrors.description && <p>* {formErrors.description}</p>}
          <button type="button" onClick={handleSubmit}>
            VALIDER
          </button>
        </form>
      </section>
    </dialog>
  );
}

export default ModalEvent;

ModalEvent.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
