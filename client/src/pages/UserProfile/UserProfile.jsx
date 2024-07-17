import { useEffect, useState } from "react";
import "./userprofile.css";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import avatar from "../../assets/images/avatar-profile.png";
import formatName from "../../utils/formatName";
import EventCard from "../../components/EventCard/EventCard";

function UserProfile() {
  const { auth, setAuth, updateEvents } = useOutletContext();
  const [errors, setErrors] = useState({});
  const [firstname, setFirstname] = useState(auth.user.firstname);
  const [lastname, setLastname] = useState(auth.user.lastname);
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(auth.user.image);
  const [edit, setEdit] = useState(false);
  const [btnValue, setBtnValue] = useState("Éditer");
  const [dataEventLiked, setDataEventLiked] = useState([]);

  const validate = () => {
    const error = {};
    if (!firstname) {
      error.firstname = "Prénom requis";
    }

    if (!lastname) {
      error.lastname = "Nom requis";
    }

    return error;
  };

  const handleBtnValue = () => {
    setEdit((prevEdit) => !prevEdit);

    if (edit) {
      setBtnValue("Éditer");
    } else {
      setBtnValue("Envoyer");
    }
  };

  const handleSubmit = async () => {
    const form = new FormData();
    if (image) form.append("image", image);
    form.append("firstname", formatName(firstname));
    form.append("lastname", formatName(lastname));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "put",
          headers: { Authorization: `Bearer ${auth.token}` },
          body: form,
        }
      );
      if (response.status === 200) {
        const user = await response.json();
        setAuth((prevState) => ({ ...prevState, user }));
        setFirstname(user.firstname);
        setLastname(user.lastname);
        setEdit(false);
        setBtnValue("Éditer");
        toast.success("Vos modifications ont bien été prise en compte !");
      } else {
        validate();
        setErrors({ update: "Échec de la mise à jour" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/like`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setDataEventLiked(data));
  }, [updateEvents]);

  return (
    <main>
      <section className="section-user-profile-infos">
        {!edit ? (
          <img
            src={auth?.user?.image ? auth.user.image : avatar}
            alt="avatar-profile"
            className="avatar-client"
          />
        ) : (
          <section className="section-picture-profile">
            <img
              src={selectedImage || auth.user.image}
              alt="avatar-profile"
              className="avatar-client-change"
            />
            <input
              onChange={(e) => {
                setSelectedImage(URL.createObjectURL(e.target.files[0]));
                setImage(e.target.files[0]);
              }}
              type="file"
            />
          </section>
        )}
        <section className="client-edition-profile">
          {!edit ? (
            <h1>{firstname}</h1>
          ) : (
            <input
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              type="text"
              value={firstname}
            />
          )}
          {!edit ? (
            <h1>{lastname}</h1>
          ) : (
            <input
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              type="text"
              value={lastname}
            />
          )}
          <p>{auth.user.email}</p>
          <button
            onClick={edit ? handleSubmit : handleBtnValue}
            type="button"
            className="btn-edition-client-profile"
          >
            {btnValue}
          </button>
          {errors.firstname && <p className="error">{errors.firstname}</p>}
          {errors.lastname && <p className="error">{errors.lastname}</p>}
          {errors.update && <p className="error">{errors.update}</p>}
        </section>
      </section>
      <section className="section-user-events">
        <h2>Mes Événements</h2>
        <div>
          {dataEventLiked.map((eventLiked) => (
            <EventCard
              key={eventLiked.id}
              id={eventLiked.id}
              image={eventLiked.image}
              name={eventLiked.name}
              description={eventLiked.description}
              date={eventLiked.date}
              startingHour={eventLiked.starting_hour}
              event={eventLiked}
            />
          ))}
        </div>
      </section>
      <section className="section-user-crews">
        <h2>Mes Collectifs</h2>
      </section>
    </main>
  );
}

export default UserProfile;
