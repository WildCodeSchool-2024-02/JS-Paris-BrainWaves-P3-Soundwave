import "./modallogin.css";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";

function ModalLogIn({ closeModalLogIn }) {
  const handleCloseModalLogIn = () => {
    closeModalLogIn(false);
  };

  return (
    <div className="display-modal-log-in">
      <div className="section-modal-log-in">
        <ImCross
          onClick={handleCloseModalLogIn}
          className="btn-close-modal-log-in"
        />
        <h1 className="title-modal-login">Salut toi !</h1>
        <div className="section-connexion-log-in">
          <label htmlFor="email" className="label-login">
            Email :
          </label>
          <input
            type="text"
            placeholder="youremail@gmail.com"
            className="input-login"
          />
          <label htmlFor="email" className="label-login">
            Mot de passe :
          </label>
          <input type="text" placeholder="*******" className="input-login" />
        </div>
        <button type="button" className="btn-connexion-log-in">
          C'est bien moi
        </button>
      </div>
    </div>
  );
}

export default ModalLogIn;

ModalLogIn.propTypes = {
  closeModalLogIn: PropTypes.func.isRequired,
};
