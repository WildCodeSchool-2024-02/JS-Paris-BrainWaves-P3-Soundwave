import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
import mascot from "../../assets/images/masquote.svg";
import "./modalsearchbar.css";

function ModalSearchBar({ closeModalSearchBar }) {
  const [events, setEvents] = useState([]);
  const [crews, setCrews] = useState([]);
  const [category, setCategory] = useState("house");
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

    fetch(`${import.meta.env.VITE_API_URL}/api/events/category/${category}`)
    .then((response) => response.json())
    .then((data) => { setCategory(data);
    });
    
  },[category])


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

    const dateEvents = event.date;
    const dateObject = new Date(dateEvents);

    const year = dateObject.getFullYear();
    const month = dateObject.toLocaleString("default", { month: "long" });
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    const formattedDate = `${day.toString().padStart(2, "0")} ${month} ${year} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    const dateEventsMatch = formattedDate.includes(dataText.toLowerCase());
    return nameEvents || dateEventsMatch;
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
