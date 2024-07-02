import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
import mascot from "../../assets/images/masquote.svg";
import "./modalsearchbar.css";

function ModalSearchBar({ closeModalSearchBar }) {
  const [crews, setCrews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataText, setDataText] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvent = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events`)
      .then((response) => response.json())
      .then((data) => setFilteredEvents(data));
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/crews`)
      .then((response) => response.json())
      .then((data) => setCrews(data));

    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });

    fetchEvent();
  }, []);

  const handleThemesSelect = (theme) => {
    if (theme !== "") {
      fetch(`${import.meta.env.VITE_API_URL}/api/events/category/${theme}`)
        .then((response) => response.json())
        .then((data) => {
          setFilteredEvents(data);
        });
    } else {
      fetchEvent();
    }
  };

  const handleCloseModalSearchBar = () => {
    closeModalSearchBar(false);
    document.body.classList.remove("active");
  };

  const filteredCrews = crews.filter((crew) =>
    crew.name.toLowerCase().includes(dataText.toLowerCase())
  );

  const filterEventSearchBar = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events`
      );
      if (response.status === 200) {
        const result = await response.json();
        const filteredEventsData = result.filter((event) =>
          event.name.toLowerCase().includes(dataText.toLowerCase())
        );
        setFilteredEvents(filteredEventsData);
      } else {
        console.error("je suis dans erros");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    setDataText(e.target.value);
    filterEventSearchBar();
  };

  const handleClickEvents = (id) => {
    navigate(`/event-details/${id}`);
    handleCloseModalSearchBar();
  };

  const handleClickCrews = (id) => {
    navigate(`/crew-details/${id}`);
    handleCloseModalSearchBar();
  };

  return (
    <dialog className="display-modal-search-bar">
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
        <select
          label="select"
          type="select"
          name="style"
          id="style"
          onChange={(e) => handleThemesSelect(e.target.value)}
        >
          <option label="Genres" />
          {categories.map((category) => (
            <option key={category.id} value={category.style}>
              {category.style}
            </option>
          ))}
        </select>
      </section>
      <h2 className="search-events-crews-title">Événements</h2>
      <section className="section-display-suggestions">
        {filteredEvents.map((event) => (
          <img
            key={event.id}
            src={event.image}
            alt="cover-event"
            className="picture-events"
            role="presentation"
            onClick={() => handleClickEvents(event.id)}
            onKeyDown={() => handleClickEvents(event.id)}
          />
        ))}
        {filteredEvents.length === 0 && <p>No Events Found</p>}
      </section>
      <h2 className="search-events-crews-title">Collectifs</h2>
      <section className="section-display-suggestions">
        {filteredCrews.map((crew) => (
          <img
            key={crew.id}
            src={crew.image}
            alt="profile-crew"
            className="picture-crews"
            role="presentation"
            onClick={() => handleClickCrews(crew.id)}
            onKeyDown={() => handleClickCrews(crew.id)}
          />
        ))}
        {filteredCrews.length === 0 && <p>No Crews Found</p>}
      </section>
      <img src={mascot} alt="mascot" className="mascot-search-bar" />
    </dialog>
  );
}

export default ModalSearchBar;

ModalSearchBar.propTypes = {
  closeModalSearchBar: PropTypes.func.isRequired,
};
