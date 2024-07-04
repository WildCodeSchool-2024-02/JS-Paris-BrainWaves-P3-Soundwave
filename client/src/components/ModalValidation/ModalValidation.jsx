import "./modalvalidation.css";
import PropTypes from "prop-types";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useRef } from "react";

function ModalValidation({ setOpenValidation, text, type, id }) {
  const handleCloseModalLogIn = () => {
    setOpenValidation(false);
    document.body.classList.remove("active");
  };
  const navigate = useNavigate();
  const { updateEvents, setUpdateEvents, updateCrews, setUpdateCrews } =
    useOutletContext();
  const comment = useRef("");

  // validate an event
  async function validateEvent() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ is_validated: true, comment: null }),
        }
      );
      if (response.ok) {
        setUpdateEvents(!updateEvents);
        toast.success("L'évènement a été validé !");
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue");
    }
  }

  // reject an event
  async function unvalidateEvent() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            is_validated: false,
            comment: comment.current.value,
          }),
        }
      );
      if (response.ok) {
        setUpdateEvents(!updateEvents);
        toast.success("L'évènement a été rejeté");
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue");
    }
  }

  // validate a crew
  async function validateCrew() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/crews/tovalidate/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ is_validated: true, comment: null }),
        }
      );
      if (response.ok) {
        setUpdateCrews(!updateCrews);
        toast.success("Le collectif a été validé !");
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue");
    }
  }

  // reject a crew
  async function unvalidateCrew() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/crews/tovalidate/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            is_validated: false,
            comment: comment.current.value,
          }),
        }
      );
      if (response.ok) {
        setUpdateCrews(!updateCrews);
        navigate("/admin");
        toast.success("Le collectif a été rejeté");
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue");
    }
  }

  return (
    <dialog className="display-modal-validation">
      <section className="section-modal-validation">
        <ImCross
          onClick={handleCloseModalLogIn}
          className="btn-close-modal-validation"
        />
        <h1>Attention</h1>
        {text ? (
          <div className="validate">
            <p>
              Vous êtes sur le point de valider un collectif ou un évènement,
              êtes vous sûr.e ?
            </p>
            <div className="btn-container-modal-validation">
              <button
                type="button"
                onClick={() =>
                  type === "event" ? validateEvent() : validateCrew()
                }
              >
                OUI
              </button>
              <button type="button" onClick={handleCloseModalLogIn}>
                NON
              </button>
            </div>
          </div>
        ) : (
          <div className="reject">
            <p>
              Vous êtes sur le point de rejeter un collectif ou un évènement !
            </p>
            <form>
              <div className="reject-form-big-screen">
                <label htmlFor="textarea">
                  raison du refus à trasnmettre au collectif :
                </label>
                <input
                  type="textarea"
                  name="texarea"
                  placeholder="raison du refus"
                  ref={comment}
                  required
                />
              </div>
              <div className="btn-container-modal-validation">
                <button
                  type="button"
                  onClick={() =>
                    type === "event" ? unvalidateEvent() : unvalidateCrew()
                  }
                >
                  CONFIRMER
                </button>
                <button type="button" onClick={handleCloseModalLogIn}>
                  RETOUR
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </dialog>
  );
}

export default ModalValidation;

ModalValidation.propTypes = {
  setOpenValidation: PropTypes.func.isRequired,
  text: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
