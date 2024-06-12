import { useNavigate } from "react-router-dom";
import { useState } from "react";
import heart from "../assets/images/masquote.svg";
import "./style/home.css";

function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="home">
      <header>
        <img className="titan" src={heart} alt="" />
        <div className="presentation">
          <h1>Bienvenue sur SoundWave</h1>
          <div>
            <p className={isOpen ? "header-p-less" : "header-p-more"}>
              Curabitur tempor quis eros tempus lacinia. Nam bibendum
              pellentesque quam a convallis. Sed ut vulputate nisi. Integer in
              felis sed leo vestibulum venenatis. Suspendisse quis arcu sem.
              Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend
              magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices
              nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla
              varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis
              eleifend. Sed nec ante dictum sem condimentum ullamcorper quis
              venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.
            </p>
            <button
              type="button"
              className="btn-show"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "read less..." : "read more..."}
            </button>
          </div>
        </div>
      </header>
      <main>
        <div>
          <h3 className="label-slider">Événements</h3>
          <div className="slider">slider</div>
        </div>
        <p className="p-title">REJOINS NOUS !</p>
        <div className="btn-div">
          <div className="btn-side">
            <div
              className="home-btn"
              role="presentation"
              onClick={() => navigate("/")}
              onKeyDown={() => navigate("/")}
            >
              <p>Waver</p>
            </div>
            <div className="description">
              <p>Qu’est ce qu’un Waver ?</p>
              <p>
                Si tu ne trouves jamais d’événements où t’ambiancer, crée ton
                espace perso !
              </p>
            </div>
          </div>

          <div className="btn-side">
            <div
              className="home-btn"
              role="presentation"
              onClick={() => navigate("/")}
              onKeyDown={() => navigate("/")}
            >
              <p>Soundwaver</p>
            </div>

            <div className="description">
              <p>Qu’est ce qu’un Soundwaver ? </p>
              <p>
                Tu es un collectif et tu souhaites promouvoir ton projet et tes
                événements, crée ton compte !
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Home;
