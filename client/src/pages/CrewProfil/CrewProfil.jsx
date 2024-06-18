import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "./crew-profil.css";
import { FaRegHeart } from "react-icons/fa";
import { TiTick, TiTimes } from "react-icons/ti";

function CrewProfil() {
  const crew = useLoaderData();
  const [login] = useState(false);
  const [admin] = useState(false);
  return (
    <main className="main-crew-profil">
      <section className="header-crew-profil">
        <img src={crew.image} alt="logo du collectif" />
        <div className="crew-profil-title-options">
          <h1>{crew.name}</h1>
          <div className="button-container-crew-profil">
            {login && <FaRegHeart className="heart-icon" />}
            {login && <button type="button">Editer</button>}
            {!admin && (
              <div className="evaluate-admin-buttons">
                <TiTick role="button" />
                <TiTimes role="button" />
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="desc-crew-profil">
        <h2>Description</h2>
        <p>{crew.description}</p>
      </section>
      <section className="events-crew-profil">
        <div className="events-crew-profil-title">
          <h2>Evènements</h2>
          {!login && <button type="button">Ajouter</button>}
        </div>
        <p>on mappera les events du collectif en question</p>
      </section>
    </main>
  );
}
export default CrewProfil;
