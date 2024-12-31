import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <FontAwesomeIcon
      className={`${className} carousel-icon-size`}
      style={{
        display: "block",
        background: "#212529",
        color: "white",
        borderRadius: "0%",
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
        background: "#212529",
        color: "white",
        borderRadius: "0%",
      }}
      onClick={onClick}
      icon={faChevronRight}
    />
  );
}

const CarouselComponent = (props) => {
  const [partners, setPartners] = useState(null);
  useEffect(() => {
    setPartners(props.partners);
  }, [props]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  console.log("carouselCOmponent:", partners);
  return (
    <div className="slider-container py-5 bg-white flex flex-col justify-center">
      {partners && (
        <Slider {...settings}>
          {partners &&
            partners.map((el, i) => {
              return (
                <div
                  key={i}
                  className="partner-carousel-images-container h-full lg:h-full flex items-center justify-center px-2 my-auto"
                >
                  <img
                    className={`partner-carousel-image partner-carousel-image-${
                      i + 1
                    } mx-auto h-[100px] object-contain flex items-center justify-center`}
                    src={el.image[0]}
                    alt=""
                  />
                </div>
              );
            })}
        </Slider>
      )}
    </div>
  );
};

export default CarouselComponent;
