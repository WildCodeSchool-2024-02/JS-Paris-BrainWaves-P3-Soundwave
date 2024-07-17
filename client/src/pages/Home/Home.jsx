import { useLoaderData, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import heart from "../../assets/images/masquote.svg";
import "./home.css";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import ModalCreateAccount from "../../components/Modal/ModalCreateAccount";

function Home() {
  const { auth } = useOutletContext();
  const results = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  const [openModalCreateAccount, setOpenModalCreateAccount] = useState(false);
  const [role, setRole] = useState("");

  const handleCreateModal = () => {
    setOpenModalCreateAccount(true);
    document.body.classList.add("active");
  };

  // split the title to animate it
  const text = "Bienvenue sur SoundWave";
  const words = text.split(" ");

  // animate the container of the title
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  // animate each letters
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <main className="home">
      <section className="header-home-page">
        <img className="heart-home" src={heart} alt="" />
        <div className="presentation-home-page">
          <motion.h1
            className="title-header-home-page"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, index) => (
              <motion.span variants={child} style={{ marginRight: "15px" }} key={index}>
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            className="transition-p"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
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
              className="btn-show-home-page"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "read less..." : "read more..."}
            </button>
          </motion.div>
        </div>
      </section>
      <section className="main-home-page">
        <div>
          <h3 className="label-slider-home-page">Les Événements</h3>
          <HomeSlider events={results} className="swiperr" />
        </div>
        {!auth.isLogged && (
          <p className="p-title-header-home-page">REJOINS NOUS !</p>
        )}
        <div className="div-btn-register">
          {!auth.isLogged && (
            <div className="btn-side-home">
              <button
                className="home-btn"
                type="button"
                onClick={() => {
                  handleCreateModal();
                  setRole("client");
                }}
              >
                Waver
              </button>
              {openModalCreateAccount && (
                <ModalCreateAccount
                  closeModalCreateAccount={setOpenModalCreateAccount}
                  role={role}
                />
              )}
              <div className="description">
                <p className="p-home-btn">Qu’est ce qu’un Waver ?</p>
                <p className="p-home-btn">
                  Si tu ne trouves jamais d’événements où t’ambiancer, crée ton
                  espace perso !
                </p>
              </div>
            </div>
          )}
          {!auth.isLogged && (
            <div className="btn-side-home">
              <button
                className="home-btn"
                type="button"
                onClick={() => {
                  handleCreateModal();
                  setRole("crew");
                }}
              >
                Soundwaver
              </button>
              <div className="description">
                <p className="p-home-btn">Qu’est ce qu’un Soundwaver ? </p>
                <p className="p-home-btn">
                  Tu es un collectif et tu souhaites promouvoir ton projet et
                  tes événements, crée ton compte !
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
export default Home;
