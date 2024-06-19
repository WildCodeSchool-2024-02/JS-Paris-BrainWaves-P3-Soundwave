import "./userprofile.css";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

function UserProfile() {
  const user = useLoaderData();
  const [login] = useState(false);
  return (
    <main>
      <section className="section-user-profile-infos">
        <div className="avatar">avatar</div>
        <div>
          <p>{user.firstname} {user.lastname}</p>
          <p>{user.email}</p>
          {!login && <button type="button">Modifier</button>}
        </div>
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
