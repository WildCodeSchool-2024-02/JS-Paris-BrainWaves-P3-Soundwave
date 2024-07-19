import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import Mascot from "../../assets/images/masquote.svg";
import "./modalevent.css";

function ModalEvent({ closeModal, id}) {
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
    dateCurrent: null,
    dateFormat: null,
    hourRequire: null,
    hourFormat: null,
    addressRequire: null,
    descriptionRequire: null,
    imageRequire: null,
    lineupRequire: null,
  });
  const { styleInput, auth } = useOutletContext();
  const handleCloseModal = () => {
    document.body.classList.remove("active");
    closeModal(false);
  };


  const handleSubmit = async () => {
    const form = new FormData();
    form.append("image", image.current.files[0]);
    form.append("name", name.current.value);
    form.append("date", date.current.value);
    form.append("starting_hour", startingHour.current.value);
    form.append("location", location.current.value);
    form.append("lineup", lineup.current.value);
    form.append('address', address.current.value);
    form.append("description", description.current.value)
    form.append("categories", JSON.stringify(styleInput));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/crews/${id}/events/categories`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          body: form,
        }
      );
      const result = await response.json();
      if (response.status === 201) {
        document.body.classList.remove("active");
        closeModal(false);
        toast.info("Evènement en cours de validation")
      } else {
        setFormErrors({
          nameRequire: null,
          dateRequire: null,
          dateCurrent: null,
          dateFormat: null,
          hourRequire: null,
          hourFormat: null,
          addressRequire: null,
          descriptionRequire: null,
          imageRequire: null,
          lineupRequire: null,
          styleRequire: null,
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
            {formErrors.dateRequire && <p>{formErrors.dateRequire} </p>}
            {formErrors.dateCurrent && <p>{formErrors.dateCurrent} </p>}
            {formErrors.dateFormat && <p>{formErrors.dateFormat}</p>}
          </div>
          <div className="section-create-event">
            <label htmlFor="hour">Heure</label>
            <input type="text" placeholder="ex: 23:00:00" ref={startingHour} />
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
            <label htmlFor="lineup">Line-Up</label>
            <input type="text" placeholder="ex: XXXX, XXXX" ref={lineup} />
            {formErrors.lineupRequire && <p>{formErrors.lineupRequire}</p>}
          </div>
          <div className="section-create-event">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              placeholder="Description... "
              ref={description}
              className="description-container"
            />
            {formErrors.descriptionRequire && (
              <p>{formErrors.descriptionRequire} </p>
            )}
          </div>
          <div className="section-create-event">
            <label htmlFor="Style">Styles</label>
            <DropDownMenu />
            {formErrors.styleRequire && <p>{formErrors.styleRequire} </p>}
          </div>
          <div className="section-create-event">
            <label htmlFor="image">Image</label>
            <div className="btn-image-select">
            <input type="file" ref={image} label="image" className="input-image-select" />
            </div>
            {formErrors.imageRequire && <p>{formErrors.imageRequire} </p>}
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="modal-event-btn"
          >
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
  id: PropTypes.func.isRequired,
};
