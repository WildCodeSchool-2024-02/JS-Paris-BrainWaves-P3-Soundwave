import { useNavigate } from "react-router-dom";
import { TiTick, TiTimes } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./admin-buttons.css";

function AdminButton({
  id,
  updateEvents,
  setUpdateEvents,
  updateCrews,
  setUpdateCrews,
}) {
  const navigate = useNavigate();
  // messages de succès
  const successNotificationForValidation = () => {
    toast.success(`évènement validé !`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const successNotificationForRejection = (item) => {
    toast.success(`${item} rejeté !`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // accepter un évènement
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
        navigate("/admin");
        successNotificationForValidation();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // refuser un évènement
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
        successNotificationForRejection("évènement");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // accepter un collectif
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
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // refuser un évènement
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
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="evaluate-admin-buttons">
      <TiTick
        role="button"
        onClick={() => {
          validateCrew();
          validateEvent();
        }}
      />
      <TiTimes
        role="button"
        onClick={() => {
          unvalidateCrew();
          unvalidateEvent();
        }}
      />
      <ToastContainer />
    </div>
  );
}

export default AdminButton;
