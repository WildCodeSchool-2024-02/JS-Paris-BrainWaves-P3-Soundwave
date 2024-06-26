import PropTypes from "prop-types";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./cardcrew.css";
import { FaRegHeart } from "react-icons/fa";
import AdminButton from "../AdminButtons/AdminButtons";

function CardCrew({ result }) {
  const navigate = useNavigate();
  const { admin, updateCrews, setUpdateCrews } = useOutletContext();

  return (
    <section
      className="specific-crew-card"
      onClick={() => navigate(`/crew-details/${result.id}`)}
      onKeyDown={() => navigate(`/crew-details/${result.id}`)}
      role="presentation"
    >
      {window.innerWidth < 1024 && (
        <>
          <div className="crew-card-presentation">
            <img src={result.image} alt="logo du collectif" />
            <h2>{result.name}</h2>
            {admin ? (
              <AdminButton
                updateCrews={updateCrews}
                setUpdateCrews={setUpdateCrews}
                id={result.id}
              />
            ) : (
              <FaRegHeart className="heart-icon" />
            )}
          </div>
          {result.description.length <= 100 ? (
            <p>{result.description}</p>
          ) : (
            <p>{result.description.slice(0, 100)}...</p>
          )}
        </>
      )}
      {window.innerWidth >= 1024 && (
        <>
          <img src={result.image} alt="logo du collectif" />
          <div className="crew-card-desc">
            <div className="crew-card-name-buttons">
              <h2>{result.name}</h2>
              {!admin ? (
                <AdminButton
                  updateCrews={updateCrews}
                  setUpdateCrews={setUpdateCrews}
                  id={result.id}
                />
              ) : (
                <FaRegHeart className="heart-icon" />
              )}
            </div>
            <p>{result.description}</p>
          </div>
        </>
      )}
    </section>
  );
}

CardCrew.propTypes = {
  result: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardCrew;
