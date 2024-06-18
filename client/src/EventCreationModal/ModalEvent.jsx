import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
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

  const handleCloseModal = () => {
    closeModal(false);
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
      if (response.ok) {
        navigate("/events-list");
      } else {
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
        <h1>Crée ton événement</h1>
        <form className="section-connexion-event">
          <label htmlFor="text">Nom</label>
          <input placeholder="Nom de l'événement" ref={name} />
          <label htmlFor="date">Date</label>
          <input type="text" placeholder="ex: YYYY-MM-DD" ref={date} />
          <label htmlFor="hour">Heure</label>
          <input type="text" placeholder="ex: 23-00-00" ref={startingHour} />
          <label htmlFor="location">Localisation</label>
          <input type="text" placeholder="Rex Club" ref={location} />
          <label htmlFor="address">Adresse</label>
          <input type="text" placeholder="12 rue du bac Paris" ref={address} />
          <label htmlFor="image">Image</label>
          <input type="text" ref={image} />
          <label htmlFor="lineup">Line-Up</label>
          <input type="text" placeholder="ex: XXXX, XXXX" ref={lineup} />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Met t'a description de l'événement"
            ref={description}
          />
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
