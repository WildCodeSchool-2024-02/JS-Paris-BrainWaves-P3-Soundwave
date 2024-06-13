import { useNavigate } from "react-router-dom";
import { useState } from "react";
import heart from "../../assets/images/masquote.svg";
import "./home.css";
import HomeSlider from "../../components/HomeSlider/HomeSlider";

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
              Soundwave est la plateforme ultime pour découvrir tous les
              événements des collectifs français, que ce soit pour les
              passionnés de soirées ou les organisateurs. Viens explorer les
              soirées incontournables et les événements exclusifs près de chez
              toi grâce à notre interface intuitive. Pour les organisateurs,
              c'est l'outil idéal pour partager et promouvoir tes événements
              auprès d'un large public. Engage et développe ton projet comme
              jamais auparavant !
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
          <HomeSlider className="swiperr" />
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
