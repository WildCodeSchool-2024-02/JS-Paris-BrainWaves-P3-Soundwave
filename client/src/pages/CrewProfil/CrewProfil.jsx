import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "./crew-profil.css";

function CrewProfil(){
    const crew = useLoaderData();
    const [login] = useState(false);
    return (
        <main className="main-crew-profil">
            <section className="header-crew-profil">
            <img src={crew.image} alt="logo du collectif"/>
            <div className="crew-profil-title-options">
            <h1>{crew.name}</h1>
            <div className="button-container-crew-profil">
            {!login && <button type="button">éditer</button>}
            </div>
            </div>
            </section>
            <section className="desc-crew-profil">
                <h2>Description</h2>
                <p>{crew.description}</p>
            </section>
            <section className="events-crew-profil">
                <h2>Evènements</h2>
                <p>on mappera les events du collectif en question</p>
            </section>
        </main>
    );
}

export default CrewProfil;