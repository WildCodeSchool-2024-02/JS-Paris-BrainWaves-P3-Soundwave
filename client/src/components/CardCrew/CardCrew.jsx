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
    <section className="specific-crew-card">
      {window.innerWidth < 1024 && (
        <section>
          <section className="display-crew-card-infos">
            <section className="display-crew-card-title-img">
              <img
                src={result.image}
                alt="logo du collectif"
                onClick={() => navigate(`/crew-details/${result.id}`)}
                onKeyDown={() => navigate(`/crew-details/${result.id}`)}
                role="presentation"
              />
              <h2>{result.name}</h2>
            </section>
            <div className="crew-card-presentation">
              {result.description.length <= 100 ? (
                <p>{result.description}</p>
              ) : (
                <p>{result.description.slice(0, 100)}...</p>
              )}
            </div>
            <div className="display-adminbtn-heart-mobile">
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
          </section>
        </section>
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
            <h2>{result.name}</h2>
            {result.description.length <= 250 ? (
              <p>{result.description}</p>
            ) : (
              <p>{result.description.slice(0, 250)}...</p>
            )}
          </div>
          <div className="crew-card-name-buttons">
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
              <div>
                {auth.isLogged === true && auth?.user?.role === "client" && (
                  <HeartIconFollowCrews crew={result} />
                )}
              </div>
            )}
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
