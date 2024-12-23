import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useGetAllHerosQuery } from "../data/heroSlice";
import { useLocalStorage } from "../context/LocalStorageContext";
import { useTranslation } from "react-i18next";

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <FontAwesomeIcon
      className={`${className} carousel-icon-size`}
      style={{
        display: "block",
        background: "rgba(0, 0, 0, 0.536)",
        color: "white",
        borderRadius: "0%",
        padding: "4px",
      }}
      onClick={onClick}
      icon={faChevronLeft}
    />
  );
}
function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <FontAwesomeIcon
      className={`${className} carousel-icon-size`}
      style={{
        display: "block",
        background: "rgba(0, 0, 0, 0.536)",
        color: "white",
        borderRadius: "0%",
        padding: "4px",
      }}
      onClick={onClick}
      icon={faChevronRight}
    />
  );
}

const Hero = () => {
  const [isSwipeEnabled, setIsSwipeEnabled] = useState(true); // State to control swipe behavior
  const { data } = useGetAllHerosQuery();
  const { t, i18n } = useTranslation();
  const { localStorageData, syncLocalStorageData } = useLocalStorage();

  useEffect(() => {
    if (data && data.length > 0) {
      syncLocalStorageData("allHeros", data);
    }
  }, [data]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    swipe: false, // Disable swipe for widths <= 1024px
    draggable: false, // Prevent dragging
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          swipe: true, // Disable swipe for widths <= 1024px
          draggable: true, // Prevent dragging
        },
      },
    ],
  };
  return (
    <Slider {...settings} className="w-screen h-full">
      {localStorageData.allHeros &&
        localStorageData.allHeros.map((el, i) => (
          <BeforeAfterSlider
          key={i}
            data={el}
          />
        ))}
    </Slider>
  );
};

export default Hero;
