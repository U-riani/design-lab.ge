import React from "react";
import SpaceComponent from "./SpaceComponent";
import { Link } from "react-router-dom";

const AboutUsComponent = () => {
  return (
    <div className="about-us-component  flex flex-col items-center">
      <div className="space-compoenent-container w-full">
        <SpaceComponent />
      </div>
      <div className="about-us-inner-container w-full lg:grid lg:grid-rows-1  lg:grid-cols-2 lg:grid-flow-col h-fit gap-0">
        <div className="about-us-row about-us-row-1 w-full h-fit py-5 flex flex-col justify-start h-full lg:pb-0">
          {/* <h2 className="about-us-title">About Us</h2> */}
          <h4 className="text-2xl font-semibold h-fit">DESIGN LAB</h4>
          <p className="py-3">
            „დიზაინ ლაბი“ პირველი პროფესიული სივრცეა დიზაინერებისთვის, რომელიც
            საქართველოს დიზაინერთა კავშირის ინიციატივით შეიქმნა დღეს როდესაც,
            არაერთი დიზაინერი სხვადასხვა სირთულის გამოწვევის წინაშეა,
            მნიშვნელოვანია არსებობდეს სივრცე, რომელიც შექმნის და იზრუნებს ამ
            ადამიანების პროფესიულ საქმიანობაზე მორგებულ სერვისებს.
          </p>
          <button className="overflow-hidden bg-black w-[200px] relative flex items-center justify-center group self-start lg:mt-auto">
            <Link to='/aboutUs'className="w-full h-full px-5 py-2 group" >
              <span className="text-white pe-[60px]">More</span>
              <em className="absolute w-[10px] bg-white h-[1px] top-2/4 right-10 transition-all duration-300 group-hover:w-[60px]"></em>
              <div className="h-2/4 w-full bg-white/[0.2] absolute tranisition-all duration-300 top-0 left-[-100%] group-hover:left-0"></div>
              <div className="h-2/4 w-full bg-white/[0.2] absolute tranisition-all duration-300 bottom-0 right-[-100%] group-hover:right-0"></div>
            </Link>
          </button>
        </div>
        <div className="about-us-row about-us-row-2 w-full lg:pt-5">
          <div className="about-us-row-2-inner-container relative w-full">
            <img
              className="object-cover ps-5 pb-5 h-[calc(100%-20px)]"
              src="images/slider-corner.jpg"
              alt=""
            />
            <img
              className="absolute h-[calc(100%-20px)] w-[calc(100%-20px)] pt-5 pe-5 mt-5  top-0 bg-[#fff]"
              src="images/pic-1.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
