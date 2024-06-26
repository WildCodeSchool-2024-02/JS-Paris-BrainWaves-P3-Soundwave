import { useNavigate, useOutletContext } from "react-router-dom";
import { TiTick, TiTimes } from "react-icons/ti";
import "./admin-buttons.css";

function AdminButton({ id }) {
  const navigate = useNavigate();
  const { updateEvents, setUpdateEvents, updateCrews, setUpdateCrews } =
    useOutletContext();

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
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
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
      }
    } catch (error) {
      console.error(error);
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
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
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
    </div>
  );
}

export default AdminButton;
