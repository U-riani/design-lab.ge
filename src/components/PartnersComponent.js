import React from "react";
import CarouselComponent from "./CarouselComponent";
import { useTranslation } from "react-i18next";
import { useGetAllPartnersQuery } from "../data/partnersSlice";
// import { Link } from "react-router-dom";

const PartnersComponent = () => {
  const { data: partners } = useGetAllPartnersQuery();
  const { t } = useTranslation();
  console.log("partners:", partners);
  return (
    <div className="partnersComponent-container px-0 py-10 mb-0 bg-black w-full">
      <div className="partnersComponent-inner-container px-0 mb-0 flex justify-center w-full">
        <div className="partnersComponent-row-1 mb-0 px-2 pb-5 lg:pb-0 mx-0 w-[90%] lg:flex flex-row justify-between">
          <div className="px-0 pb-4 pb-xl-0 partners-title-container mb-0 lg:flex lg:h-full lg:flex-col lg:justify-end">
            <h2 className="align-left lg:mt-auto lg:mb-3 text-white pb-3 xl:pb-0 text-2xl lg:text-3xl font-bold">
              {t("partners")}
            </h2>
            <div className="partnersComponent-line mt-auto bg-white w-[80px] h-[4px]"></div>
          </div>
          <div className="partnersComponent-carousel mb-0 pe-0 ps-0 pb-4 lg:pb-0 lg:w-[70%]">
            <CarouselComponent partners={partners} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersComponent;
