import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./modallogin.css";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
import mascot from "../assets/images/masquote.svg";

function ModalLogIn({ closeModalLogIn, setDataUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const validate = () => {
    const error = {};
    if (!email) {
      error.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.email = "Saisissez une adresse mail";
    }

    if (!password) {
      error.password = "Mot de passe requis";
    } else if (password.length < 4) {
      error.password = "Saisissez votre mot de passe";
    }

    return error;
  };

  async function userData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.status === 200) {
        const result = await response.json();
        setDataUser(result);
        navigate("/user-profil");
      } else {
        setErrors({ login: "Identifiant inconnu" });
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleCloseModalLogIn = () => {
    closeModalLogIn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorData = validate();
    if (Object.keys(errorData).length > 0) setErrors(errorData);
    else {
      handleCloseModalLogIn();
      userData();
    }
  };

  return (
    <dialog className="display-modal-log-in">
      <section className="section-modal-log-in">
        <ImCross
          onClick={handleCloseModalLogIn}
          className="btn-close-modal-log-in"
        />
        <img src={mascot} alt="mascot" />
        <h1>Salut toi !</h1>
        <form className="section-connexion-log-in">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="youremail@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-login-infos">{errors.email}</p>}
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="error-login-infos">{errors.password}</p>
          )}
          <div className="display-btn-connexion-login">
            <button type="button" onClick={handleSubmit}>
              C'est bien moi
            </button>
            {errors.login && <p className="error-login">{errors.login}</p>}
          </div>
        </form>
        <section className="section-not-login">
          <p>Tu n’as pas encore de compte ? </p>
          <p className="redirection-sign-in">Inscris-toi !</p>
        </section>
      </section>
    </dialog>
  );
}

export default ModalLogIn;

ModalLogIn.propTypes = {
  closeModalLogIn: PropTypes.func.isRequired,
  setDataUser: PropTypes.func.isRequired,
};
