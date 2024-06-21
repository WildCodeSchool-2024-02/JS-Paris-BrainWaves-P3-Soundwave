import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "./crew-profil.css";
import { FaRegHeart } from "react-icons/fa";
import { TiTick, TiTimes } from "react-icons/ti";

function CrewProfil() {
  const crew = useLoaderData();
  const [login] = useState(false);
  const [edit, setEdit] = useState(false);
  const [btnValue, setBtnValue] = useState("editer");
  const [admin] = useState(false);
  const [username, setUsername] = useState(crew.name);
  const [description, setDescription] = useState(crew.description);
  const [errors, setErrors] = useState({});

  const handleBtnValue = () => {
    setEdit((prevEdit) => !prevEdit);

    if (edit) {
      setBtnValue("editer");
    } else {
      setBtnValue("envoyer");
    }
  };

  const handleInputChange = (event) => {
    const textarea = event.target;
    textarea.style.height = ""; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust the height based on the content
    setDescription(textarea.value); // Update the state with the textarea value
  };

  const validate = () => {
    const error = {};
    if (!username) {
      error.username = "Nom d'utilisateur requis";
    }

    if (!description) {
      error.description = "Description requise";
    }

    return error;
  };

  async function updateCrewData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/crews/${crew.id}`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: username, description }),
        }
      );
      if (response.status === 200) {
        const result = await response.json();
        setUsername(result.name);
        setDescription(result.description);
        setEdit(false);
        setBtnValue("editer");
      } else {
        setErrors({ update: "Échec de la mise à jour" });
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const errorData = validate();
    if (Object.keys(errorData).length > 0) {
      setErrors(errorData);
    } else {
      await updateCrewData();
    }
  };

  return (
    <main className="main-crew-profil">
      <section className="header-crew-profil">
        <img src={crew.image} alt="logo du collectif" />
        <div className="crew-profil-title-options">
          {!edit ? (
            <h1>{username}</h1>
          ) : (
            <input
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              value={username}
            />
          )}
          <div className="button-container-crew-profil">
            {login && <FaRegHeart className="heart-icon" />}
            <button
              onClick={edit ? handleSubmit : handleBtnValue}
              type="button"
            >
              {btnValue}
            </button>
            {!admin && (
              <div className="evaluate-admin-buttons">
                <TiTick role="button" />
                <TiTimes role="button" />
              </div>
            )}
          </div>
        </div>
      </section>

      {!edit ? (
        <section className="desc-crew-profil">
          <h2>Description</h2>
          <p>{description}</p>
        </section>
      ) : (
        <textarea
          className="input-description-crew-profil"
          onChange={handleInputChange}
          style={{
            height: "auto",
            minHeight: "10rem",
            width: "50rem",
            minWidth: "10rem",
          }}
          value={description}
        />
      )}
      {errors.username && <p className="error">{errors.username}</p>}
      {errors.description && <p className="error">{errors.description}</p>}
      {errors.update && <p className="error">{errors.update}</p>}

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
