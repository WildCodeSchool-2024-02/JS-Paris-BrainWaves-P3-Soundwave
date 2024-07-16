import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./modallogin.css";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
import mascot from "../../assets/images/masquote.svg";

function ModalLogIn({ closeModalLogIn, setAuth, setEventLike }) {
  const email = useRef("");
  const password = useRef("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const validate = () => {
    const error = {};
    if (!email.current.value) {
      error.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(email.current.value)) {
      error.email = "Saisissez une adresse mail valide";
    }

    if (!password.current.value) {
      error.password = "Mot de passe requis";
    }

    return error;
  };

  const handleCloseModalLogIn = () => {
    closeModalLogIn(false);
    document.body.classList.remove("active");
  };

  async function userData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
          }),
          credentials: "include",
        }
      );
      if (response.status === 200) {
        const { user, crew, likeEvent } = await response.json();
        const token = response.headers.get("Authorization");
        setAuth({ isLogged: true, user, token, crew });
        if (user.role === "admin") {
          navigate("/admin");

        }
        if (user.role === "client") {
          navigate("/");
          setEventLike(likeEvent)
        }
        if (user.role === "crew") {
          navigate("/");
        }
        handleCloseModalLogIn();
      } else {
        setErrors({ login: "Identifiant inconnu" });
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorData = validate();
    if (Object.keys(errorData).length > 0) setErrors(errorData);
    else {
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
        <form className="form-log-in">
          <div className="section-register-log-in">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="youremail@gmail.com"
              ref={email}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className="section-register-log-in">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              ref={password}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className="display-btn-connection-login">
            <button type="button" onClick={handleSubmit}>
              C'est bien moi
            </button>
            {errors.login && <p>{errors.login}</p>}
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
  setAuth: PropTypes.func.isRequired,
  setEventLike: PropTypes.func.isRequired,
};
