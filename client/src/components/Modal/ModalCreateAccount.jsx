import { useState, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import "./modalcreateaccount.css";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import mascot from "../../assets/images/masquote.svg";
import formatName from "../../utils/formatName";

function ModalCreateAccount({ closeModalCreateAccount, role }) {
  const firstname = useRef("");
  const lastname = useRef("");
  const email = useRef("");
  const password = useRef("");
  const navigate = useNavigate();
  const { setAuth, setOpenModalLogIn } = useOutletContext();
  const [formUserErrors, setFormUserErrors] = useState({
    firstnameRequire: null,
    lastnameRequire: null,
    emailRequire: null,
    emailFormat: null,
    emailChecked: null,
    passwordRequire: null,
    passwordFormat: null,
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: formatName(firstname.current.value),
            lastname: formatName(lastname.current.value),
            email: email.current.value,
            password: password.current.value,
            role,
          }),
          credentials: "include",
        }
      );
      const user = await response.json();
      const token = response.headers.get("Authorization");
      if (response.ok) {
        setAuth({ isLogged: true, user, token });
        if (user?.role === "client") {
          toast.success("Utilisateur créé avec succès !");
          navigate(`/user-profile`);
          document.body.classList.remove("active");
        } else if (user?.role === "crew") {
          toast.success("Collectif créé avec succès !");
          navigate(`/crew-creation/${user.id}`);
          document.body.classList.remove("active");
        }
      } else {
        setFormUserErrors({
          firstnameRequire: null,
          lastnameRequire: null,
          emailRequire: null,
          emailFormat: null,
          emailChecked: null,
          passwordRequire: null,
          passwordFormat: null,
        });
        user.forEach((element) => {
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

  const handleCloseModalCreateAccount = () => {
    closeModalCreateAccount(false);
    document.body.classList.remove("active");
  };

  const handleModalLogIn = () => {
    setOpenModalLogIn(true);
  }

  return (
    <dialog className="display-modal-create-account">
      <section className="section-modal-create-account">
        <ImCross
          onClick= {handleCloseModalCreateAccount}
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
              <p>{formUserErrors.passwordRequire}</p>
            )}
            {formUserErrors.passwordFormat && (
              <p>{formUserErrors.passwordFormat}</p>
            )}
          </div>
          <div className="display-btn-connection-create-account">
            <button type="button" onClick={handleSubmit}>
              Je m'inscris
            </button>
          </div>
          {formUserErrors.emailChecked && <p>{formUserErrors.emailChecked}</p>}
        </form>
        <section className="section-already-connect">
          <p>Tu as déjà un compte ? </p>
          <p className="redirection-sign-in"role="presention" onClick={() =>{handleCloseModalCreateAccount(); handleModalLogIn()}} onKeyDown= {() =>{handleCloseModalCreateAccount(); handleModalLogIn()}}>Connecte-toi !</p>
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
