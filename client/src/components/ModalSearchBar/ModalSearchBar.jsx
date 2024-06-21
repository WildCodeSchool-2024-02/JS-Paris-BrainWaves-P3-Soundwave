import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
import mascot from "../../assets/images/masquote.svg";
import "./modalsearchbar.css";

function ModalSearchBar({ closeModalSearchBar }) {
  const [events, setEvents] = useState([]);
  const [crews, setCrews] = useState([]);
  const [dataText, setDataText] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events`)
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/crews`)
      .then((response) => response.json())
      .then((data) => setCrews(data));
  }, []);

  const handleCloseModalSearchBar = () => {
    closeModalSearchBar(false);
    document.body.classList.remove("active");
  };

  const shuffle = (array) => {
    const newArray = [...array].sort(() => Math.random() - 0.5);
    return newArray;
  };

  const shuffleEvents = shuffle(events);
  const shuffleCrews = shuffle(crews);

  const filteredEvents = shuffleEvents.filter((event) =>
    event.name.toLowerCase().includes(dataText.toLowerCase())
  );

  const filteredCrews = shuffleCrews.filter((crew) =>
    crew.name.toLowerCase().includes(dataText.toLowerCase())
  );

  const handleChange = (e) => {
    e.preventDefault();
    setDataText(e.target.value);
  };

  return (
    <dialog className="display-modal-search-bar">
      <section className="section-modal-search-bar">
        <ImCross
          onClick={handleCloseModalSearchBar}
          className="btn-close-modal-search-bar"
        />
        <input
          type="search"
          placeholder="Recherche un événement, un collectif, une date ..."
          value={dataText}
          onChange={handleChange}
        />
        <section className="section-display-suggestions">
          <h2>Événements</h2>
          <div className="display-search-events">
            {filteredEvents.map((event) => (
              <img
                key={event.id}
                src={event.image}
                alt="cover-event"
                className="picture-events"
              />
            ))}
          </div>
          <h2>Collectifs</h2>
          <div className="display-search-crews">
            {filteredCrews.map((crew) => (
              <img
                key={crew.id}
                src={crew.image}
                alt="profile-crew"
                className="picture-crews"
              />
            ))}
          </div>
        </section>
        <img src={mascot} alt="mascot" className="mascot" />
      </section>
    </dialog>
  );
}

export default ModalSearchBar;

ModalSearchBar.propTypes = {
  closeModalSearchBar: PropTypes.func.isRequired,
};
