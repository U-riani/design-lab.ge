import React, { useEffect, useState } from "react";
import SpaceComponent from "../components/SpaceComponent";
import { useGetAllPartnersQuery } from "../data/partnersSlice";
import useScreenWidth from "../hooks/useScreenWidth";
import { useLocalStorage } from "../context/LocalStorageContext";
import { useTranslation } from "react-i18next";

const PartnersPage = () => {
  const { data, isLoading, error } = useGetAllPartnersQuery();
  const [partnersLength, setPartnersLength] = useState(1);
  const [rowNum, setRowNum] = useState(1);
  const [colNum, setColNum] = useState(1);
  const screenWidth = useScreenWidth();

  const { localStorageData, syncLocalStorageData } = useLocalStorage();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (data) {
      syncLocalStorageData("allPartners", data);
    }
  }, [data]);

  useEffect(() => {
    if (localStorageData.allPartners) {
      if (screenWidth < 640) {
        setRowNum(localStorageData.allPartners.length);
        setColNum(1);
      } else if (screenWidth >= 640 && screenWidth < 768) {
        setRowNum(
          localStorageData.allPartners.length % 2 === 0
            ? localStorageData.allPartners.length / 2
            : Math.floor(localStorageData.allPartners.length / 2) + 1
        );
        setColNum(2);
      } else if (screenWidth >= 768 && screenWidth < 1024) {
        setRowNum(
          localStorageData.allPartners.length % 3 === 0
            ? localStorageData.allPartners.length / 3
            : Math.floor(localStorageData.allPartners.length / 3) + 1
        );
        setColNum(3);
      } else if (screenWidth >= 1024 && screenWidth < 1280) {
        setRowNum(
          localStorageData.allPartners.length % 4 === 0
            ? localStorageData.allPartners.length / 4
            : Math.floor(localStorageData.allPartners.length / 4) + 1
        );
        setColNum(4);
      } else {
        setRowNum(
          localStorageData.allPartners.length % 5 === 0
            ? localStorageData.allPartners.length / 5
            : Math.floor(localStorageData.allPartners.length / 5) + 1
        );
        setColNum(5);
      }
    }
  }, [screenWidth, localStorageData.allPartners]);

  return (
    <div className="w-full partners-page">
      <div className="space-component-container w-full">
        <SpaceComponent />
      </div>
      <div className={`partners-page-inner bg-white px-[20px] py-5`}>
        <div
          className={`partners-cards-container w-full flex flex-col sm:flex-row flex-wrap justify-center sm:justify-start items-center`}
        >
          {localStorageData.allPartners &&
            localStorageData.allPartners.map((el, i) => (
              <div
                key={i}
                className="partners-card bg-white group relative w-full w-full max-w-[400px] sm:w-[50%] md:w-[calc(100%/3)] lg:w-[25%] xl:w-[calc(100%/5)] 2xl:w-[calc(100%/5)] lg:aspect-[5/3] p-3"
              >
                <div className="partners-card-image-containerw-full w-full h-full">
                  <img
                    className="object-contain w-full h-full"
                    src={el.image[0]}
                    alt=""
                  />
                </div>
                <div className="partners-card-text-container absolute w-full h-full top-0 left-0 transition-all duration-700 group-hover:bg-[#000000d4] ">
                  <div className="partners-card-text-inner-container relative w-full h-full px-5 py-3 flex flex-col justify-between items-start">
                    <div className="line-left bg-white absolute top-[5%] opacity-0 left-[10px] w-[1px] h-[10px]  group-hover:h-full group-hover:top-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="line-top bg-white absolute top-[5%] opacity-0 left-[10px] w-[10px] h-[1px]  group-hover:w-full group-hover:left-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="partners-card-text text-white overflow-hidden transition-all duration-700 opacity-0 group-hover:opacity-100">
                      <h5 className="font-semibold">{el.name[i18n.language]}</h5>
                      <p className="text-[10px]">{el.text[i18n.language]}</p>
                    </div>
                    <a
                      href="#"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="button bg-black text-white px-2 pb-0.5 border-2 opacity-0 group-hover:opacity-100"
                    >
                      button
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;
