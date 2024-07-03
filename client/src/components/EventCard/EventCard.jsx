import PropTypes from "prop-types";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./eventcard.css";
import { FaRegHeart } from "react-icons/fa";
import AdminButton from "../AdminButtons/AdminButtons";

function EventCard({
  image,
  name,
  description,
  date,
  startingHour,
  id,
  isValidated,
}) {
  const navigate = useNavigate();
  const { auth } = useOutletContext();

  const handleDetailsEvent = () => {
    navigate(`/event-details/${id}`);
  };

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
        </div>
      </div>
      {auth.isLogged && auth.user.role === "admin" && !isValidated ? (
        <AdminButton id={id} type="event" />
      ) : (
        <div className="heart-icon-container">
          <FaRegHeart className="heart-icon" />
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
};
