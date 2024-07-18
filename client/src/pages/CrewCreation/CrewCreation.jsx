import { useEffect, useRef, useState } from "react";
import "./crew-creation.css";
import { toast } from "react-toastify";
import { useOutletContext, useLoaderData, useNavigate } from "react-router-dom";

function CrewCreation() {
  const crew = useLoaderData();
  const [username, setUsername] = useState("");
  const image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7mMNz8YCBvYmnr3BQUPX__YsC_WtDuAevwg&s";

  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { auth } = useOutletContext();
  const [errors, setErrors] = useState({});
  const imageInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null); // New state for selected image

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl); // Update the selected image state
    }
  };
  useEffect(() => {
    const checkOwnerId = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/crews/user/${auth.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            navigate(`/crew-details/${data[0].id}`);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du ownerId:", error);
      }
    };

    checkOwnerId();
  }, [auth?.user?.id, navigate]);

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
    if (!imageInputRef.current.files[0]) {
      error.image = "Image requise";
    }

    return error;
  };

  const handleSubmit = async () => {
    const errorData = validate();
    if (Object.keys(errorData).length > 0) {
      setErrors(errorData);
      Object.keys(errorData).forEach((key) => {
        toast.error(errorData[key]);
      });
      return;
    }

    const form = new FormData();
    form.append("name", username);
    form.append("image", imageInputRef.current.files[0]);
    form.append("ownerId", auth.user.id);
    form.append("description", description);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/crews/`,
        {
          method: "post",
          headers: { Authorization: `Bearer ${auth.token}` },
          body: form,
        }
      );
      if (response.status === 201) {
        toast.success("Votre profil a été envoyé aux admins pour validation");
        const crewId = await response.json();
        navigate(`/crew-details/${crewId}`);
      } else {
        toast.warning("Un problème est survenu");
        setErrors({ update: "Échec de la création du compte" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la soumission du formulaire");
    }
  };

  return (
    <main className="main-crew-creation">
      {!crew ? (
        <>
          <section className="header-crew-creation">
            <div className="div-img-input">
              <figure
                className="display-avatar-profile display-avatar-default"
                role="presentation"
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <img
                  src={selectedImage || image}
                  alt="avatar-profile"
                  className="avatar-client-change"
                  role="presentation"
                />
                <input
                  type="file"
                  hidden
                  ref={imageInputRef}
                  onChange={handleImageChange}
                />
              </figure>
            </div>
            <div className="crew-creation-title-options">
              <input
                className="input-crew-crea"
                type="text"
                value={username}
                placeholder="Nom"
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="button-container-crew-creation">
                <button onClick={handleSubmit} type="button">
                  Send
                </button>
              </div>
            </div>
          </section>
          <section className="desc-crew-creation">
            <textarea
              className="textarea-crew-crea"
              value={description}
              placeholder="Description"
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
        <p>Vous avez déjà un crew :/</p>
      )}
    </main>
  );
}

export default CrewCreation;
