import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

function HeartIconFollowCrews({ crew }) {
  const [follow, setFollow] = useState(false);
  const { auth, crewFollow, setCrewFollow, updateCrews, setUpdateCrews } = useOutletContext();

  const handleIsFollow = () => {
    setFollow(!follow)
  }

  const handleFollowCrew = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/users/follow`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify({
                    crew_id:crew.id,
                }),
            }
        );
        if (response.ok) {
            setCrewFollow((prev) => ([...prev, {crew_id: crew.id}]))
        } else {
            console.error("Follow non pris en compte");
        }
    } catch (error) {
        console.error(error); 
    }
  };

  const handleFollowDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/follow`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            crew_id: crew.id,
          }),
        }
      );
      if (response.ok) {
        setCrewFollow(crewFollow.filter((follows) => follows.crew_id !== crew.id));
        setUpdateCrews(!updateCrews);
      } else {
        console.error("Unfollow non pris en compte");
    }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <section>
      {crewFollow?.find((followed) => followed.crew_id === crew.id ) ? (
        <FaHeart
          className="heart-icon"
          onClick={() => {
            handleIsFollow();
            handleFollowDelete();
          }}
        />
      ) : (
        <FaRegHeart
          className="heart-icon"
          onClick={() => {
            handleFollowCrew();
            handleIsFollow();
          }}
        />
      )}
    </section>
  );
}

export default HeartIconFollowCrews;

HeartIconFollowCrews.propTypes = {
    crew: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }).isRequired,
  };