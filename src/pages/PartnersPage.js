import React, { useEffect, useState } from "react";
import SpaceComponent from "../components/SpaceComponent";
import { useGetAllPartnersQuery } from "../data/partnersSlice";
import useScreenWidth from "../hooks/useScreenWidth";

const PartnersPage = () => {
  const { data: partnersData, error, isLoading } = useGetAllPartnersQuery();
  const [partnersLength, setPartnersLength] = useState(1);
  const [rowNum, setRowNum] = useState(1);
  const [colNum, setColNum] = useState(1);
  const screenWidth = useScreenWidth();
  console.log(screenWidth);
  useEffect(() => {
    if (partnersData) {
      if (screenWidth < 640) {
        setRowNum(partnersData.length);
        setColNum(1);
        console.log("rows", rowNum);
        console.log("col", colNum);
      } else if (screenWidth >= 640 && screenWidth < 768) {
        setRowNum(
          partnersData.length % 2 === 0
            ? partnersData.length / 2
            : Math.floor(partnersData.length / 2) + 1
        );
        setColNum(2);
        console.log("rows", rowNum);
        console.log("col", colNum);
      } else if (screenWidth >= 768 && screenWidth < 1024) {
        setRowNum(
          partnersData.length % 3 === 0
            ? partnersData.length / 3
            : Math.floor(partnersData.length / 3) + 1
        );
        setColNum(3);
        console.log("rows", rowNum);
        console.log("col", colNum);
      } else if (screenWidth >= 1024 && screenWidth < 1280) {
        setRowNum(
          partnersData.length % 4 === 0
            ? partnersData.length / 4
            : Math.floor(partnersData.length / 4) + 1
        );
        setColNum(4);
        console.log("rows", rowNum);
        console.log("col", colNum);
      }else {
        setRowNum(
          partnersData.length % 5 === 0
            ? partnersData.length / 5
            : Math.floor(partnersData.length / 5) + 1
        );
        setColNum(5);
        console.log("rows", rowNum);
        console.log("col", colNum);
      }
    }
  }, [screenWidth, partnersData]);
  console.log(partnersData);
  return (
    <div className="w-full partners-page">
      <div className="space-component-container w-full">
        <SpaceComponent />
      </div>
      <div className={`partners-page-inner bg-white px-[20px] py-5`}>
        <div
          className={`partners-cards-container w-full grid ${
            colNum === 1
              ? "grid-cols-1"
              : colNum === 2
              ? "grid-cols-2"
              : colNum === 3
              ? "grid-cols-3"
              : "grid-cols-4"
          }   gap-[30px]`}
        >
          {partnersData &&
            partnersData.map((el, i) => (
              <div
                key={i}
                className="partners-card bg-white group relative w-full aspect-[5/3]"
              >
                <div className="partners-card-image-containerw-full">
                  <img
                    className="object-contain w-full aspect-[5/3]"
                    src={el.image[0]}
                    alt=""
                  />
                </div>
                <div className="partners-card-text-container absolute w-full h-full top-0 left-0 transition-all duration-700 group-hover:bg-[#000000d4] ">
                  <div className="partners-card-text-inner-container relative w-full h-full px-5 py-3 flex flex-col justify-between items-start">
                    <div className="line-left bg-white absolute top-[5%] opacity-0 left-[10px] w-[1px] h-[10px]  group-hover:h-full group-hover:top-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="line-top bg-white absolute top-[5%] opacity-0 left-[10px] w-[10px] h-[1px]  group-hover:w-full group-hover:left-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="partners-card-text text-white overflow-hidden transition-all duration-700 opacity-0 group-hover:opacity-100">
                      <h5 className="font-semibold">title</h5>
                      <p className="text-[10px]">
                        description sdsa sa sd sad sad sad sa sa sad sasadsad
                        sdsad sadsadsadasdsadsad sadsad sa
                      </p>
                    </div>
                    <a href='#' rel="noopener noreferrer" target="_blank" className="button bg-black text-white px-2 pb-0.5 border-2 opacity-0 group-hover:opacity-100">button</a>
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
