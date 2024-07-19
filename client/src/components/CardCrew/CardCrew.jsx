import PropTypes from "prop-types";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./cardcrew.css";
import AdminButton from "../AdminButtons/AdminButtons";
import HeartIconFollowCrews from "../HeartIconFollowCrews/HeartIconFollowCrews";

function CardCrew({ result, setOpenValidation, setText, setValidationId }) {
  const navigate = useNavigate();
  const { auth, setType } = useOutletContext();

  setType("crew");

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
            {auth.isLogged &&
            auth.user.role === "admin" &&
            !result.is_validated ? (
              <AdminButton
                setText={setText}
                setOpenValidation={setOpenValidation}
                setValidationId={setValidationId}
                id={result.id}
              />
            ) : (
              <HeartIconFollowCrews crew={result} />
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
              {auth.isLogged &&
              auth.user.role === "admin" &&
              !result.is_validated ? (
                <div style={{zIndex: 99}}>
                <AdminButton
                  setText={setText}
                  setOpenValidation={setOpenValidation}
                  setValidationId={setValidationId}
                  id={result.id}
                />
                </div>
              ) : (
                <HeartIconFollowCrews crew={result} />
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
    is_validated: PropTypes.func,
  }).isRequired,
  setOpenValidation: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  setValidationId: PropTypes.func,
};

CardCrew.defaultProps = {
  setValidationId: null,
};

export default CardCrew;
