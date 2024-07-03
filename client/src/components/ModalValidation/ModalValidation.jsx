import "./modalvalidation.css";
import PropTypes from "prop-types";
import { ImCross } from "react-icons/im";

function ModalValidation({ setOpenValidation, text }) {
  const handleCloseModalLogIn = () => {
    setOpenValidation(false);
    document.body.classList.remove("active");
  };

  return (
    <dialog className="display-modal-validation">
      <section className="section-modal-validation">
        <ImCross
          onClick={handleCloseModalLogIn}
          className="btn-close-modal-log-in"
        />
        <h1>Attention</h1>
        {text ? (
          <div className="validate">
            <p>
              Vous êtes sur le point de valider un collectif ou un évènement,
              êtes vous sûr.e ?
            </p>
            <div className="btn-container-modal-validation">
              <button type="button">OUI</button>
              <button type="button">NON</button>
            </div>
          </div>
        ) : (
          <div className="reject">
            <p>
              Vous êtes sur le point de rejeter un collectif ou un évènement !
            </p>
            <form>
              <div className="reject-form-big-screen">
                <label htmlFor="textarea">
                  raison du refus à trasnmettre au collectif :
                </label>
                <input type="textarea" name="texarea" />
              </div>
              <div className="btn-container-modal-validation">
                <button type="submit">CONFIRMER</button>
                <button type="button">RETOUR</button>
              </div>
            </form>
          </div>
        )}
      </section>
    </dialog>
  );
}

export default ModalValidation;

ModalValidation.propTypes = {
  setOpenValidation: PropTypes.func.isRequired,
  text: PropTypes.func.isRequired,
};
