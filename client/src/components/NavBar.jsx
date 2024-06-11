import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { FaSearch } from "react-icons/fa";
import soundwave from "../assets/images/SoundWave.svg";
import mascot from "../assets/images/masquote.svg";

function NavBar() {
  const navigate = useNavigate();

  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

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
        <div className="navbar-desktop-btns">
          <p>
            <FaSearch />
          </p>
          <p
            role="presentation"
            onClick={() => navigate("/events-list")}
            onKeyDown={() => navigate("/events-list")}
          >
            Événements
          </p>
          <p
            role="presentation"
            onClick={() => navigate("/collectifs-list")}
            onKeyDown={() => navigate("/collectifs-list")}
          >
            Collectifs
          </p>
          <p>Log In</p>
        </div>
      </nav>
      <div className={menuClass}>
        <div className="navbar-btns">
          <p
            role="presentation"
            onClick={() => {
              navigate("/events-list");
              setMenuClass("menu hidden");
              setBurgerClass("burger-bar unclicked");
            }}
            onKeyDown={() => navigate("/events-list")}
          >
            Événements
          </p>
          <p
            role="presentation"
            onClick={() => {
              navigate("/collectifs-list");
              setMenuClass("menu hidden");
              setBurgerClass("burger-bar unclicked");
            }}
            onKeyDown={() => navigate("/collectifs-list")}
          >
            Collectifs
          </p>
          <p>Log In</p>
          <img src={mascot} alt="mascot" />
        </div>
      </div>
    </section>
  );
}

export default NavBar;
