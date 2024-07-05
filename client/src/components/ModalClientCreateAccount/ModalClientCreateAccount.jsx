import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./modalcreateaccount.css";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
import mascot from "../../assets/images/masquote.svg";

function ModalCreateAccount({ closeModalCreateAccount, role }) {
  const firstname = useRef("");
  const lastname = useRef("");
  const email = useRef("");
  const password = useRef("");
  // const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formUserErrors, setFormUserErrors] = useState({
    firstnameRequire: null,
    lastnameRequire: null,
    emailRequire: null,
    emailFormat: null,
    passwordRequire: null,
    passwordFormat: null,
  });

  // const validate = () => {
  //   const error = {};

  //   if (!firstname.current.value) {
  //     error.firstname = "Prénom obligatoire";
  //   }

  //   if (!lastname.current.value) {
  //     error.lastname = "Nom obligatoire";
  //   }

  //   if (!email.current.value) {
  //     error.email = "Email obligatoire";
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.current.value)
  //   ) {
  //     error.email = "Saisissez une adresse mail";
  //   }

  //   if (!password.current.value) {
  //     error.password = "Mot de passe obligatoire";
  //   } else if (password.current.value.length < 4) {
  //     error.password = "Le mot de passe doit contenir au moins 4 caractères";
  //   }

  //   return error;
  // };
  const handleCloseModalLogIn = () => {
    closeModalCreateAccount(false);
    document.body.classList.remove("active");
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: firstname.current.value,
            lastname: lastname.current.value,
            email: email.current.value,
            password: password.current.value,
            role,
          }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        navigate(`/user-profile/`);
        handleCloseModalLogIn();
      } else {
        setFormUserErrors({
          firstnameRequire: null,
          lastnameRequire: null,
          emailRequire: null,
          emailFormat: null,
          passwordRequire: null,
          passwordFormat: null,
        });
        result.forEach((element) => {
          setFormUserErrors((prev) => ({
            ...prev,
            [element.label]: element.error,
          }));
        });
        console.error("Erreur création");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const errorData = validate();
  //   if (Object.keys(errorData).length > 0) setErrors(errorData);
  //   else {
  //     handleCloseModalLogIn();
  //     createUser();
  //   }
  // };

  return (
    <dialog className="display-modal-create-account">
      <section className="section-modal-create-account">
        <ImCross
          onClick={handleCloseModalLogIn}
          className="btn-close-modal-create-account"
        />
        <img src={mascot} alt="mascot" />
        <h1>Dis m'en plus sur toi !</h1>
        <form className="form-create-account">
          <div className="section-register-create-account">
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              name="firstname"
              placeholder="John"
              ref={firstname}
            />
            {formUserErrors.firstnameRequire && (
              <p>{formUserErrors.firstnameRequire}</p>
            )}
          </div>
          <div className="section-register-create-account">
            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              name="lastname"
              placeholder="Doe"
              ref={lastname}
            />
            {formUserErrors.lastnameRequire && (
              <p>{formUserErrors.lastnameRequire}</p>
            )}
          </div>
          <div className="section-register-create-account">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="youremail@gmail.com"
              ref={email}
            />
            {formUserErrors.emailRequire && (
              <p>{formUserErrors.emailRequire}</p>
            )}
            {formUserErrors.emailFormat && <p>{formUserErrors.emailFormat}</p>}
          </div>
          <div className="section-register-create-account">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              ref={password}
            />
            {formUserErrors.passwordRequire && (
              <p>{formUserErrors.passwordFormat}</p>
            )}
            {formUserErrors.emailFormat && <p>{formUserErrors.emailFormat}</p>}
          </div>
          <div className="display-btn-connection-create-account">
            <button type="button" onClick={handleSubmit}>
              Je m'inscris
            </button>
          </div>
        </form>
        <section className="section-already-connect">
          <p>Tu as déjà un compte ? </p>
          <p className="redirection-sign-in">Connecte-toi !</p>
        </section>
      </section>
    </dialog>
  );
}

export default ModalCreateAccount;

ModalCreateAccount.propTypes = {
  closeModalCreateAccount: PropTypes.func.isRequired,
  role: PropTypes.func.isRequired,
};
