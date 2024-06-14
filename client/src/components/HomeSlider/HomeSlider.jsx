import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PropTypes from "prop-types";

import { FreeMode, Autoplay } from "swiper/modules";
import "./homeslider.css";
import { useState, useEffect } from "react";

function HomeSlider({ props }) {
  const [spaceBetween, setSpaceBetween] = useState(5);
  const events = props;

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
      autoplay={{
        delay: 1,
        disableOnInteraction: false,
      }}
      modules={[FreeMode, Autoplay]}
      className="mySwiper"
    >
      {events.map((result) => (
        <SwiperSlide key={result.id}>
          <img key={result.id} src={result.image} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
HomeSlider.propTypes = {
  props: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default HomeSlider;
