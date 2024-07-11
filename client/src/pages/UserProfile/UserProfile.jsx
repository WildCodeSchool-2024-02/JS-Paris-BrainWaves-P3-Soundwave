import { useState } from "react";
import "./userprofile.css";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import avatar from "../../assets/images/avatar-profile.png";

function UserProfile() {
  const { auth } = useOutletContext();
  const [errors, setErrors] = useState({});
  const [firstname, setFirstname] = useState(auth.user.firstname);
  const [lastname, setLastname] = useState(auth.user.lastname);
  const [edit, setEdit] = useState(false);
  const [btnValue, setBtnValue] = useState("Éditer");

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
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${auth.user.id}`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
          }),
        }
      );
      if (response.status === 200) {
        const result = await response.json();
        setFirstname(result.firstname);
        setLastname(result.lastname);
        setEdit(false);
        setBtnValue("Éditer");
        toast.success("Modification prise en compte !");
      } else {
        validate();
        setErrors({ update: "Échec de la mise à jour" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <section className="section-user-profile-infos">
        <img src={avatar} alt="avatar-profile" className="avatar-client" />
        <section className="client-edition-profile">
          {!edit ? (
            <h1>{auth.user.firstname}</h1>
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
            <h1>{auth.user.lastname}</h1>
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
      </section>
      <section className="section-user-crews">
        <h2>Mes Collectifs</h2>
      </section>
    </main>
  );
}

export default UserProfile;
