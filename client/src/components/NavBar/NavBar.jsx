import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./navbar.css";
import { FaSearch } from "react-icons/fa";
import soundwave from "../../assets/images/SoundWave.svg";
import mascot from "../../assets/images/masquote.svg";
import ModalLogIn from "../Modal/ModalLogIn";

function NavBar({ auth, setAuth }) {
  const navigate = useNavigate();

  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const [openModalLogIn, setOpenModalLogIn] = useState(false);

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  const handleModal = () => {
    setOpenModalLogIn(true);
    setMenuClass("menu hidden");
    setBurgerClass("burger-bar unclicked");
    document.body.classList.add("active");
  };

  return (
    <section className="display-navbar">
      <nav>
        <img
          src={soundwave}
          alt="logo-navigation"
          className="navbar-logo"
          role="presentation"
          onClick={() => navigate("/")}
          onKeyDown={() => navigate("/")}
        />
        <div className="navigation">
          <FaSearch className="logo-searchbar" />
          <div
            className="burger-menu"
            role="presentation"
            onClick={updateMenu}
            onKeyDown={updateMenu}
          >
            <div className={burgerClass} />
            <div className={burgerClass} />
            <div className={burgerClass} />
          </div>
        </div>
        <div className="navbar-desktop-btns">
          <FaSearch className="logo-searchbar-desktop" />
          <ul>
            <li
              role="presentation"
              onClick={() => navigate("/events-list")}
              onKeyDown={() => navigate("/events-list")}
            >
              Événements
            </li>
            <li
              role="presentation"
              onClick={() => navigate("/crews-list")}
              onKeyDown={() => navigate("/crews-list")}
            >
              Collectifs
            </li>
            <li role="presentation" onClick={handleModal}>
              Log In
            </li>
          </ul>
        </div>
      </nav>
      {openModalLogIn && (
        <ModalLogIn
          closeModalLogIn={setOpenModalLogIn}
          auth={auth}
          setAuth={setAuth}
        />
      )}
      <nav className={menuClass}>
        <div className="navbar-btns">
          <ul>
            <li
              role="presentation"
              onClick={() => {
                navigate("/events-list");
                setMenuClass("menu hidden");
                setBurgerClass("burger-bar unclicked");
              }}
              onKeyDown={() => navigate("/events-list")}
            >
              Événements
            </li>
            <li
              role="presentation"
              onClick={() => {
                navigate("/crews-list");
                setMenuClass("menu hidden");
                setBurgerClass("burger-bar unclicked");
              }}
              onKeyDown={() => navigate("/crews-list")}
            >
              Collectifs
            </li>
            <li role="presentation" onClick={handleModal}>
              Log In
            </li>
          </ul>
          <img src={mascot} alt="mascot" />
        </div>
      </nav>
    </section>
  );
}

export default NavBar;

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  setAuth: PropTypes.func.isRequired,
};
