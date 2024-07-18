import PropTypes from "prop-types";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import "./eventcard.css";
import HeartIconLike from "../HeartIconLike/HeartIconLike";
import AdminButton from "../AdminButtons/AdminButtons";

function EventCard({
  image,
  name,
  description,
  date,
  startingHour,
  id,
  isValidated,
  comment,
  setOpenValidation,
  setText,
  setValidationId,
  event,
}) {
  const navigate = useNavigate();
  const { auth, setType } = useOutletContext();
  const handleDetailsEvent = () => {
    navigate(`/event-details/${id}`);
  };

  setType("event");
  const params = useParams();

  return (
    <div className="event-card-container">
      <div
        className="event-all-container"
        onClick={handleDetailsEvent}
        role="presentation"
      >
        <img src={image} alt="event" className="event-img" />
        <div className="event-info">
          <h1 className="event-card-title">{name}</h1>
          <p>{description.slice(0, 100)}</p>
          <p className="date-hour">
            {date.slice(0, 10)} | {startingHour.slice(0, 5)}
          </p>
          { auth?.crew?.id === Number(params.id) && isValidated === false && 
            <p className="admin-comment">
              Raison du refus par l'administrateur : {comment}
            </p>
          }
        </div>
      </div>
      {auth.isLogged && auth.user.role === "admin" && !isValidated ? (
        <AdminButton
          setText={setText}
          setOpenValidation={setOpenValidation}
          setValidationId={setValidationId}
          id={id}
        />
      ) : (
        <div className="heart-icon-container">
          <HeartIconLike event={event} />
        </div>
      )}
    </div>
  );
}

export default EventCard;

EventCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  startingHour: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isValidated: PropTypes.bool,
  comment: PropTypes.string,
  setOpenValidation: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  setValidationId: PropTypes.func,
  event: PropTypes.shape({
    eventId: PropTypes.number.isRequired,
    eventName: PropTypes.string.isRequired,
  }).isRequired,
};

EventCard.defaultProps = {
  isValidated: false, // Valeur par défaut pour isValidated
  comment: "", // Valeur par défaut pour comment
  setValidationId: () => {}, // Valeur par défaut pour setValidationId (une fonction vide)
};

