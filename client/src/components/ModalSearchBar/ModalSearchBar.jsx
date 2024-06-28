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
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];

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
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    if (selectedMonth !== "") {
      const monthIndex = months.indexOf(selectedMonth);
      const filtered = events.filter((event) => {
        const eventMonth = new Date(event.date).getMonth();
        return eventMonth === monthIndex;
      });
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [events, selectedMonth]);

  const handleCloseModalSearchBar = () => {
    closeModalSearchBar(false);
    document.body.classList.remove("active");
  };

  const shuffle = (array) => {
    const newArray = [...array].sort(() => Math.random() - 0.5);
    return newArray;
  };

  const shuffleCrews = shuffle(crews);

  const filteredCrews = shuffleCrews.filter((crew) =>
    crew.name.toLowerCase().includes(dataText.toLowerCase())
  );

  const handleChange = (e) => {
    e.preventDefault();
    setDataText(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
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
          id="date"
          name="date"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option label="Date" />
          {months.map((month) => (
            <option key={month.id} value={month}>
              {month}
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
      <h2 className="search-events-crews-title">Événements</h2>
      <section className="section-display-suggestions">
        {filteredEvents.map((event) => (
          <img
            key={event.id}
            src={event.image}
            alt="cover-event"
            className="picture-events"
          />
        ))}
        {/* {filteredEvents.length === 0 && <p>No Events Found</p>} */}
      </section>
      <h2 className="search-events-crews-title">Collectifs</h2>
      <section className="section-display-suggestions">
        {filteredCrews.map((crew) => (
          <img
            key={crew.id}
            src={crew.image}
            alt="profile-crew"
            className="picture-crews"
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
