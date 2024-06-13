import { useState } from "react";
import "./modallogin.css";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
import mascot from "../assets/images/masquote.svg";

function ModalLogIn({ closeModalLogIn }) {
  const handleCloseModalLogIn = () => {
    closeModalLogIn(false);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const validate = () => {
    const error = {};
    if (!email) {
      error.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.email = "Saisissez votre adresse mail";
    } else {
      error.email = "";
    }

    if (!password) {
      error.password = "Mot de passe requis";
    } else if (password.length < 4) {
      error.password = "Saisissez votre mot de passe";
    } else {
      error.password = "";
    }

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorData = validate();
    setErrors(errorData);
  };

  return (
    <div className="display-modal-log-in">
      <div className="section-modal-log-in">
        <ImCross
          onClick={handleCloseModalLogIn}
          className="btn-close-modal-log-in"
        />
        <img src={mascot} alt="mascot" className="modal-login-logo" />
        <h1 className="title-modal-login">Salut toi !</h1>
        <form className="section-connexion-log-in" onSubmit={handleSubmit}>
          <label htmlFor="email" className="label-login">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="youremail@gmail.com"
            className="input-login"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error-login">{errors.email}</div>}
          <label htmlFor="password" className="label-login">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            placeholder="********"
            className="input-login"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className="error-login">{errors.password}</div>
          )}
          <div className="display-btn-connexion-login">
            <button type="submit" className="btn-connexion-log-in">
              C'est bien moi
            </button>
          </div>
        </form>
        <div className="section-not-login">
          <p>Tu n’as pas encore de compte ? </p>
          <p className="redirection-sign-in">Inscris-toi !</p>
        </div>
      </div>
    </div>
  );
}

export default ModalLogIn;

ModalLogIn.propTypes = {
  closeModalLogIn: PropTypes.func.isRequired,
};
