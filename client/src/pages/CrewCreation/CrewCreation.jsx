import { useState } from "react";
import "./crew-creation.css";
import { useOutletContext, useLoaderData, useNavigate } from "react-router-dom";

function CrewCreation() {
  const crew = useLoaderData();
  const [username, setUsername] = useState("name");
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7mMNz8YCBvYmnr3BQUPX__YsC_WtDuAevwg&s"
  );

  const navigate = useNavigate();

  const { auth } = useOutletContext();

  const [description, setDescription] = useState("description");
  const [errors, setErrors] = useState({});

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

  async function createCrewData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/crews/`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: username,
            image,
            ownerId: auth.users.id,
            description,
          }),
        }
      );
      if (response.status === 200) {
        const result = await response.json();
        setUsername(result.name);
        setDescription(result.description);
        setImage(result.image);
      } else {
        setErrors({ update: "Échec de la creatoin du compte" });
      }
      if (response.ok) {
        const crew2 = await response.json();
        navigate(`/crew-details/${crew2.id}`);
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
      await createCrewData();
    }
  };

  return (
    <main className="main-crew-profile">
      {!crew ? (
        <>
          <section className="header-crew-profile">
            <div className="div-img-input">
              <img src={image} alt="logo du collectif" />
              <input
                className="input-crew-crea"
                onChange={(event) => setImage(event.target.value)}
                type="text"
                value={image}
              />
            </div>
            <div className="crew-profile-title-options">
              <input
                className="input-crew-crea"
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                value={username}
              />
              <div className="button-container-crew-profile">
                <button onClick={handleSubmit} type="button">
                  send
                </button>
              </div>
            </div>
          </section>
          <section className="desc-crew-profile">
            <textarea
              className="textarea-crew-crea"
              onChange={handleInputChange}
              value={description}
            />
            {errors.username && <p className="error">{errors.username}</p>}
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
            {errors.update && <p className="error">{errors.update}</p>}
          </section>
        </>
      ) : (
        <p>'vous avez deja un crew :)'</p>
      )}
    </main>
  );
}

export default CrewCreation;
