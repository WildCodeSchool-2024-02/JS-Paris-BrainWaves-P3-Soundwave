import { useRef, useState } from "react";
import "./crew-creation.css";
import { useOutletContext, useLoaderData, useNavigate } from "react-router-dom";

function CrewCreation() {
  const crew = useLoaderData();
  const [username, setUsername] = useState("Nom");
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7mMNz8YCBvYmnr3BQUPX__YsC_WtDuAevwg&s"
  );
  const [description, setDescription] = useState("Description");
  const navigate = useNavigate();
  const { auth } = useOutletContext();
  const [errors, setErrors] = useState({});
  const imageInputRef = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Update the state with the new image URL
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

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("name", username);
    form.append("image", imageInputRef.current.files[0]);
    form.append("ownerId", auth.user.id);
    form.append("description", description);

    const errorData = validate();
    if (Object.keys(errorData).length > 0) {
      setErrors(errorData);
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/crews/`,
          {
            method: "post",
            headers: { Authorization: ` Bearer ${auth.token}` },
            body: form,
          }
        );
        if (response.status === 201) {
          const crew2 = await response.json();
          navigate(`/crew-details/${crew2}`);
        } else {
          setErrors({ update: "Échec de la création du compte" });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <main className="main-crew-creation">
      {!crew ? (
        <>
          <section className="header-crew-creation">
            <div className="div-img-input">
              <img src={image} alt="logo du collectif" />
              <input
                type="file"
                ref={imageInputRef}
                onChange={handleImageChange}
              />
            </div>
            <div className="crew-creation-title-options">
              <input
                className="input-crew-crea"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="button-container-crew-creation">
                <button onClick={handleSubmit} type="button">
                  send
                </button>
              </div>
            </div>
          </section>
          <section className="desc-crew-creation">
            <textarea
              className="textarea-crew-crea"
              value={description}
              onChange={handleInputChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
            {errors.update && <p className="error">{errors.update}</p>}
          </section>
        </>
      ) : (
        <p>vous avez deja un crew :/</p>
      )}
    </main>
  );
}

export default CrewCreation;
