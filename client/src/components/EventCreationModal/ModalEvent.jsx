import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
import Mascot from "../../assets/images/masquote.svg";
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
  const [formErrors, setFormErrors] = useState({
    nameRequire: null,
    dateRequire: null,
    hourRequire: null,
    dateFormat: null,
    addressRequire: null,
    descriptionRequire: null,
    imageRequire: null,
    lineupRequire: null,
  });

  const handleCloseModal = () => {
    document.body.classList.remove("active");
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
      const result = await response.json();
      if (response.status === 201) {
        document.body.classList.remove("active");
        navigate(`/events-list`);
      } else {
        setFormErrors({
          nameRequire: null,
          dateRequire: null,
          hourRequire: null,
          hourFormat: null,
          addressRequire: null,
          descriptionRequire: null,
          imageRequire: null,
          lineupRequire: null,
        });
        result.forEach((element) => {
          setFormErrors((prev) => ({
            ...prev,
            [element.label]: element.error,
          }));
        });
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
          <div className="section-create-event">
            <label htmlFor="text">Nom</label>
            <input placeholder="Nom de l'événement" ref={name} />
            {formErrors.nameRequire && <p>{formErrors.nameRequire}</p>}
          </div>
          <div className="section-create-event">
            <label htmlFor="date">Date</label>
            <input type="text" placeholder="ex: YYYY-MM-DD" ref={date} />
            {formErrors.dateRequire && <p>{formErrors.dateRequire}</p>}
          </div>
          <div className="section-create-event">
            <label htmlFor="hour">Heure</label>
            <input type="text" placeholder="ex: 23:00:00" ref={startingHour} />
            {/* {formErrors.hourRequire && <p>{formErrors.hourRequire}</p>} */}
            {formErrors.hourFormat && <p>{formErrors.hourFormat}</p>}
          </div>
          <div className="section-create-event">
            <label htmlFor="location">Localisation</label>
            <input type="text" placeholder="Rex Club" ref={location} />
          </div>
          <div className="section-create-event">
            <label htmlFor="address">Adresse</label>
            <input
              type="text"
              placeholder="12 rue du bac Paris"
              ref={address}
            />
            {formErrors.addressRequire && <p>{formErrors.addressRequire}</p>}
          </div>
          <div className="section-create-event">
            <label htmlFor="image">Image</label>
            <input type="text" ref={image} />
            {formErrors.imageRequire && <p>{formErrors.imageRequire} </p>}
          </div>
          <div className="section-create-event">
            <label htmlFor="lineup">Line-Up</label>
            <input type="text" placeholder="ex: XXXX, XXXX" ref={lineup} />
            {formErrors.lineupRequire && <p>{formErrors.lineupRequire}</p>}
          </div>
          <div className="section-create-event">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder="Description... "
              ref={description}
            />
            {formErrors.descriptionRequire && (
              <p>{formErrors.descriptionRequire} </p>
            )}
          </div>
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
