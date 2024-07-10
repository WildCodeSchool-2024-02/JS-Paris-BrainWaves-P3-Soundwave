import PropTypes from "prop-types";
import { useNavigate, useOutletContext } from "react-router-dom";
import HeartIconLike from "../HeartIconLike/HeartIconLike";
import "./cardcrew.css";
import AdminButton from "../AdminButtons/AdminButtons";

function CardCrew({ result }) {
  const navigate = useNavigate();
  const { updateCrews, setUpdateCrews, auth } = useOutletContext();

  return (
    <section className="specific-crew-card">
      {window.innerWidth < 1024 && (
        <>
          <div className="crew-card-presentation">
            <img
              src={result.image}
              alt="logo du collectif"
              onClick={() => navigate(`/crew-details/${result.id}`)}
              onKeyDown={() => navigate(`/crew-details/${result.id}`)}
              role="presentation"
            />
            <h2>{result.name}</h2>
            {auth.isLogged &&
            auth.user.role === "admin" &&
            !result.is_validated ? (
              <AdminButton
                updateCrews={updateCrews}
                setUpdateCrews={setUpdateCrews}
                id={result.id}
                type="crew"
              />
            ) : (
              <HeartIconLike />
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
          <img
            src={result.image}
            alt="logo du collectif"
            onClick={() => navigate(`/crew-details/${result.id}`)}
            onKeyDown={() => navigate(`/crew-details/${result.id}`)}
            role="presentation"
          />
          <div className="crew-card-desc">
            <div className="crew-card-name-buttons">
              <h2>{result.name}</h2>
              {auth.isLogged &&
              auth.user.role === "admin" &&
              !result.is_validated ? (
                <AdminButton
                  updateCrews={updateCrews}
                  setUpdateCrews={setUpdateCrews}
                  id={result.id}
                  type="crew"
                />
              ) : (
                <HeartIconLike />
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
    is_validated: PropTypes.func.isRequired,
  }).isRequired,
};

export default CardCrew;
