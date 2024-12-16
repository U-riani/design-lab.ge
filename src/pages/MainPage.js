import React from "react";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import AboutUsComponent from "../components/AboutUsComponent";
import NewsComponent from "../components/NewsComponent";
import { LastNewsProvider } from "../context/LastNewsContext";
import PartnersComponent from "../components/PartnersComponent";

const MainPage = () => {
  return (
    <div className=" w-full ">
      {/* <div className="main-hero h-[calc(100vh-72px)] overflow-hidden">
        <BeforeAfterSlider
          beforeImage={"/slide1-b.jpg"}
          afterImage={"/slide1.jpg"}
        />
      </div> */}
      <div className="about-us-container pb-10">
        <AboutUsComponent />
      </div>
      <div className="news-component-container pb-10">
        <LastNewsProvider>
          <NewsComponent />
        </LastNewsProvider>
      </div>
      {/* <div className="partners-component-container">
        <PartnersComponent />
      </div> */}
    </div>
  );
};

export default MainPage;
