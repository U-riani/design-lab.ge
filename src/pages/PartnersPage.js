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
        <SpaceComponent data={{ data: t("partners") }}/>
      </div>
      <div className={`partners-page-inner bg-white px-[20px] py-5`}>
        <div
          className={`partners-cards-container w-full flex flex-col sm:flex-row flex-wrap justify-center sm:justify-start items-center`}
        >
          {localStorageData.allPartners &&
            localStorageData.allPartners.map((el, i) => (
              <div
                key={i}
                className="partners-card mb-5 md:mx-[10px] bg-white group relative w-[100%] aspect-[3/3] md:w-[calc(50%-20px)] lg:w-[calc(100%/3-20px)] xl:w-[calc(100%/4-20px)] 2xl:w-[calc(100%/5-20px)]"
              >
                <div className="partners-card-image-containerw-full w-full h-full">
                  <img
                    className="object-contain mx-auto w-full h-full"
                    src={el.image[0]}
                    alt=""
                  />
                </div>
                <div className="partners-card-text-container absolute w-full h-full top-0 left-0 transition-all duration-700 group-hover:bg-[#000] opacity-90">
                  <div className="partners-card-text-inner-container relative w-full h-full p-[15px] flex flex-col justify-between items-start">
                    <div className="line-left bg-white absolute top-[15px] opacity-0 left-[15px] w-[1px] h-[10px]  group-hover:h-[calc(100%-15px)] group-hover:top-0 group-hover:opacity-100 transition-all duration-[1s]"></div>
                    <div className="line-top bg-white absolute top-[15px] opacity-0 left-[15px] w-[10px] h-[1px]  group-hover:w-[calc(100%-15px)] group-hover:left-0 group-hover:opacity-100 transition-all duration-[1s]"></div>
                    <div className="partners-card-text pt-2 ps-3 text-white overflow-hidden transition-all duration-700 opacity-0 group-hover:opacity-100">
                      <h5 className="text-2xl font-semibold pb-1">{el.name[i18n.language]}</h5>
                      <p className="text-[12px] leading-5">{el.text[i18n.language]}</p>
                    </div>
                    <a
                      href="#"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="button bg-black text-sm text-white ms-3 px-2 pt-1 border-2 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-700"
                    >
                      {t('visitWebsite')}
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
