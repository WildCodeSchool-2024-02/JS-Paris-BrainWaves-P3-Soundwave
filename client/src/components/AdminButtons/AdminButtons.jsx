import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { TiTick, TiTimes } from "react-icons/ti";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import "./admin-buttons.css";
import ModalValidation from "../ModalValidation/ModalValidation";

function AdminButton({ id }) {
  const navigate = useNavigate();
  const { updateEvents, setUpdateEvents, updateCrews, setUpdateCrews } =
    useOutletContext();
  const [openValidation, setOpenValidation] = useState(false);
  const [text, setText] = useState(true);

  // handle open Modal


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
          body: JSON.stringify({ is_validated: true }),
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
          body: JSON.stringify({ is_validated: false }),
        }
      );
      if (response.ok) {
        setUpdateEvents(!updateEvents);
        navigate("/admin");
        toast.success("L'évènement a été rejeté");
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
        `${import.meta.env.VITE_API_URL}/api/crews/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ is_validated: true }),
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
        `${import.meta.env.VITE_API_URL}/api/crews/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ is_validated: false }),
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
    <div className="evaluate-admin-buttons">
      <TiTick
        role="button"
        value="validate"
        onClick={() => {
          validateCrew();
          validateEvent();
        }}
      />
      <TiTimes
        role="button"
        value="unvalidate"
        onClick={() => {
          unvalidateCrew();
          unvalidateEvent();
        }}
      />
      {openValidation && (
        <ModalValidation
          setOpenValidation={setOpenValidation}
          text={text}
          setText={setText}
        />
      )}
    </div>
  );
}

export default AdminButton;

AdminButton.propTypes = {
  id: PropTypes.func.isRequired,
};