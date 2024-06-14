import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Autoplay, Mousewheel } from "swiper/modules";
import "./homeslider.css";
import { useState, useEffect } from "react";

function HomeSlider() {
  const [spaceBetween, setSpaceBetween] = useState(5);

  useEffect(() => {
    const updateSpaceBetween = () => {
      if (window.innerWidth > 760) {
        setSpaceBetween(5);
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
      mousewheel
      loop
      freeMode
      speed={18000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      modules={[FreeMode, Autoplay, Mousewheel]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img
          src="https://www.merchandisingplaza.fr/40763/4/T-shirts-L-inspecteur-Gadget-T-shirt-L-Inspecteur-Gadget-Go-Go-Gadget-l.jpg"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default HomeSlider;
