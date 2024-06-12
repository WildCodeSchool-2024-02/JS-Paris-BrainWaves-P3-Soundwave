import PropTypes from "prop-types";
import "./eventcard.css";
import { FaRegHeart } from "react-icons/fa";

function EventCard({ image, name, description, date, startingHour }) {
  return (
    <div className="event-card-container">
      <div className="event-all-container">
        <img src={image} alt="event" className="event-img" />
        <div className="event-info">
          <h1>{name}</h1>
          <p>{description}</p>
          <p className="date-hour">
            {date} | {startingHour}
          </p>
        </div>
      </div>
      <div className="heart-icon-container">
        <FaRegHeart className="heart-icon" />
      </div>
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
};
