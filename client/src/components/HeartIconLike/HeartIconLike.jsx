import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

function HeartIconLike({ event }) {
  const [liked, setLiked] = useState(false);
  const { auth, eventLike, setEventLike } = useOutletContext();

  const handleLikeEvent = () => {
    setLiked(!liked);
  };

  const handleLikeUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            event_id: event.id,
          }),
        }
      );
      if (response.ok) {
        setEventLike((prev) => ([...prev, {event_id: event.id}]));
      } else {
        console.error("Like non pris en compte");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/like`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            event_id: event.id,
          }),
        }
      );
      if (response.ok) {
        setEventLike(eventLike.filter((like) => like.event_id !== event.id))
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {eventLike?.find((likedEvent) => likedEvent.event_id === event.id) ? (
        <FaHeart
          className="heart-icon"
          onClick={() => {
            handleLikeEvent();
            handleLikeDelete();
          }}
        />
      ) : (
        <FaRegHeart
          className="heart-icon"
          onClick={() => {
            handleLikeUser();
            handleLikeEvent();
          }}
        />
      )}
    </div>
  );
}

export default HeartIconLike;

HeartIconLike.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
};
