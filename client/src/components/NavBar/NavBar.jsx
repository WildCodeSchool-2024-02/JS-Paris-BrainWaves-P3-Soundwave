import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./navbar.css";
import { FaSearch } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import soundwave from "../../assets/images/SoundWave.svg";
import mascot from "../../assets/images/masquote.svg";
import ModalLogIn from "../Modal/ModalLogIn";
import ModalSearchBar from "../ModalSearchBar/ModalSearchBar";

function NavBar({ auth, setAuth }) {
  const navigate = useNavigate();

  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [openModalLogIn, setOpenModalLogIn] = useState(false);
  const [openModalSearchBar, setOpenModalSearchBar] = useState(false);
  const [menuAccount, setMenuAccount] = useState(false);

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

  const handleModalSearchBar = () => {
    setOpenModalSearchBar(true);
    document.body.classList.add("active");
  };

  const openAccountMenu = () => {
    setMenuAccount(!menuAccount);
  }

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
          <FaSearch className="logo-searchbar" onClick={handleModalSearchBar} />{" "}
          {openModalSearchBar && (
            <ModalSearchBar closeModalSearchBar={setOpenModalSearchBar} />
          )}
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
          <FaSearch
            className="logo-searchbar-desktop"
            onClick={handleModalSearchBar}
          />
          {openModalSearchBar && (
            <ModalSearchBar closeModalSearchBar={setOpenModalSearchBar} />
          )}
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
            {/* {auth.isLogged === "false" && ( */}
              <li role="presentation" onClick={handleModal}>
                Log In
              </li>
            {/* )} */}
            {auth.isLogged === "true" && <RxAvatar role="presentation" onClick={openAccountMenu} onKeyDown={openAccountMenu}/>}
          </ul>
          {/* <ul>
            <li>Mon compte</li>
            <li>Déconnexion</li>
          </ul> */}
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
  auth: PropTypes.func.isRequired,
  setAuth: PropTypes.func.isRequired,
};
