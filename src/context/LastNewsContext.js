import React, { createContext, useState, useEffect } from "react";
import { useGetLast5NewsQuery } from "../data/newsSlice";

export const LastNewsContext = createContext();

export const LastNewsProvider = ({ children }) => {
  const [position, setPosition] = useState(0);
  const [last5News, setLast5News] = useState([]);
  const { data: last5NewsData } = useGetLast5NewsQuery();

  // Helper function to load data from localStorage
  const loadFromLocalStorage = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : undefined;
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      return undefined;
    }
  };

  // Helper function to save data to localStorage
  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
    }
  };

  // Helper function to compare data arrays
  const isDataDifferent = (localData, serverData) => {
    if (!localData || localData.length !== serverData.length) return true;
    return JSON.stringify(localData) !== JSON.stringify(serverData);
  };

  useEffect(() => {
    const localData = loadFromLocalStorage("last5News");

    if (last5NewsData) {
      const transformedData = last5NewsData.map((el, i) => ({
        id: i,
        title: el.title,
        imageSrc: el.images,
        text: el.text,
        activeNews: i, // Initially set the first slide as active
      }));

      if (isDataDifferent(localData, transformedData)) {
        saveToLocalStorage("last5News", transformedData);
        setLast5News(transformedData);
      } else {
        setLast5News(localData);
      }
    }
  }, [last5NewsData]);

  const moveSlide = (step) => {
    setPosition((prevPosition) => {
      setLast5News((prevNews) =>
        prevNews.map((el, i) => ({
          ...el,
          activeNews:
            (el.activeNews + 1 * step + last5News.length) % last5News.length,
        }))
      );
      return "newPosition";
    });
  };

  const moveSlideToNext = () => moveSlide(-1);
  const moveSlideToPrev = () => moveSlide(1);

  return (
    <LastNewsContext.Provider
      value={{ position, moveSlideToNext, moveSlideToPrev, last5News }}
    >
      {children}
    </LastNewsContext.Provider>
  );
};
