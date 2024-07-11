import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

function HeartIconLike({ event }) {
  const [likeEvent, setLikeEvent] = useState(false);
  const { auth, setEventLike } = useOutletContext();

  const handleLikeEvent = () => {
    setLikeEvent(!likeEvent);
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
        const result = await response.json();
        setEventLike(result);
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
        const result = await response.json();
        setEventLike(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!likeEvent ? (
        <FaRegHeart
          className="heart-icon"
          onClick={() => {
            handleLikeUser();
            handleLikeEvent();
          }}
        />
      ) : (
        <FaHeart
          className="heart-icon"
          onClick={() => {
            handleLikeEvent();
            handleLikeDelete();
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
