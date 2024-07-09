import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FreeMode, Autoplay } from "swiper/modules";
import "./homeslider.css";
import { useState, useEffect } from "react";

function HomeSlider({ events }) {
  const [spaceBetween, setSpaceBetween] = useState(5);
  const navigate = useNavigate();

  const handleDetailsEvent = (id) => {
    navigate(`/event-details/${id}`);
  };

  useEffect(() => {
    const updateSpaceBetween = () => {
      if (window.innerWidth > 760) {
        setSpaceBetween(15);
      } else {
        setSpaceBetween(20);
      }
    };
    updateSpaceBetween();

    window.addEventListener("resize", updateSpaceBetween);

    return () => window.removeEventListener("resize", updateSpaceBetween);
  }, []);

  return (
    <Swiper
      direction="horizontal"
      slidesPerView={3}
      spaceBetween={spaceBetween}
      loop
      freeMode
      speed={1800}
      preventClicks
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      modules={[FreeMode, Autoplay]}
      className="mySwiper"
    >
      {events.map((result) => (
        <SwiperSlide key={result.id}>
          <img
            onClick={() => handleDetailsEvent(result.id)}
            onKeyDown={() => handleDetailsEvent(result.id)}
            role="presentation"
            src={result.image}
            alt={result.name}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

HomeSlider.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default HomeSlider;
