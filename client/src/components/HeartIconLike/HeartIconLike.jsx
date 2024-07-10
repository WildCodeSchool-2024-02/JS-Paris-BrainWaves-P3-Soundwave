import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

function HeartIconLike() {
  const [likeEvent, setLikeEvent] = useState(false);

  const handleLikeEvent = () => {
    setLikeEvent(!likeEvent);
  };

  return (
    <div>
      {!likeEvent ? (
        <FaRegHeart className="heart-icon" onClick={handleLikeEvent} />
      ) : (
        <FaHeart className="heart-icon" onClick={handleLikeEvent} />
      )}
    </div>
  );
}

export default HeartIconLike;
