import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
import mascot from "../../assets/images/masquote.svg";
import "./modalsearchbar.css";

function ModalSearchBar({ closeModalSearchBar }) {
  const [events, setEvents] = useState([]);
  const [crews, setCrews] = useState([]);
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/category`)
      .then((response) => response.json())
      .then((data) => setCategories(data));
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

  const filteredEvents = shuffleEvents.filter((event) => {
    const nameEvents = event.name
      .toLowerCase()
      .includes(dataText.toLowerCase());
    return nameEvents;
  });

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
        <section className="section-option-date-category">
          <select label="select" type="select" name="date" id="date">
            <option label="Date" />
            {events.map((eventDate) => (
              <option key={eventDate.id} value={eventDate.id}>
                {eventDate.date}
              </option>
            ))}
          </select>
          <select label="select" type="select" name="style" id="style">
            <option label="Genres" />
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.style}
              </option>
            ))}
          </select>
        </section>
        <section className="section-display-suggestions">
          <h2>Événements</h2>
          <div className="display-search-events">
            {filteredEvents.map((event) => (
              <div key={event.id} className="info-searchbar-events">
                <img
                  src={event.image}
                  alt="cover-event"
                  className="picture-events"
                />
                <p className="title-search-events">{event.name}</p>
              </div>
            ))}
          </div>
          {filteredEvents.length === 0 && <p>No Events Found</p>}
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
            {filteredCrews.length === 0 && <p>No Crews Found</p>}
          </div>
        </section>
        <img src={mascot} alt="mascot" className="mascot-search-bar" />
      </section>
    </dialog>
  );
}

export default ModalSearchBar;

ModalSearchBar.propTypes = {
  closeModalSearchBar: PropTypes.func.isRequired,
};
