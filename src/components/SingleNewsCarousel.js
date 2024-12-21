import React from "react";
import Slider from "react-slick";

function SingleNewsCarousel({ data }) {
  const settings = {
    dots: true,
    infinite: data.length > 1, // Disable infinite scrolling if there's only 1 slide
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container w-full  ">
      {data && data.length > 0 ? (
        <Slider {...settings}>
          {data.map((image, i) => (
            <div key={i} className="slide w-full aspect-[2/1]">
              <img className="h-full  max-w-full mx-auto object-contain" src={image} alt={`Slide ${i + 1}`} />
            </div>
          ))}
        </Slider>
      ) : (
        <p>No slides available.</p>
      )}
    </div>
  );
}

export default SingleNewsCarousel;
