import React, { useEffect } from "react";
import he from "he";
import { Link } from "react-router-dom";
import { useGetAllNewsQuery } from "../data/newsSlice";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "../context/LocalStorageContext";
import SpaceComponent from "../components/SpaceComponent";

const NewsPage = () => {
  const { data, isLoading, error } = useGetAllNewsQuery();
  const { localStorageData, syncLocalStorageData } = useLocalStorage();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (data) {
      syncLocalStorageData("allNews", data);
    }
  }, [data]);

  const extractTextRegex = (html) => {
    const textOnly = html.replace(/<[^>]*>/g, " ");
    return he.decode(textOnly);
  }; 

  if (!localStorageData.allNews && isLoading) {
    return (
      <div className="getNewsComponent text-center">
        <div animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="getNewsComponent">
  //       <div variant="danger">Error fetching news: {error.message}</div>
  //     </div>
  //   );
  // }
  return (
    <div className="news-page-container w-full flex flex-col items-center">
      <div className="space-component-container w-full">
        <SpaceComponent data={{ data: t("news") }}/>
      </div>
      <div className="news-page-inner-container pt-10 px-5">
        {localStorageData.allNews &&
          localStorageData.allNews.map((el, i) => (
            <div className="news-card bg-white flex p-5 mb-10" key={i}>
              <div className="news-card-left w-1/2 aspect-[5/3] flex flex-col pr-3">
                <div className="news-page-text-container h-full overflow-hidden flex flex-col">
                  <h5 className="font-semibold pb-3 text-[10px] md:text-sm lg:text-2xl">
                    {el.title[i18n.language]}
                  </h5>
                  <p className="hidden md:block text-xs leading-5 text-gray-600">
                    {extractTextRegex(
                      el.text[i18n.language] || "news not found"
                    )}
                  </p>
                </div>
                <div className="news-page-button-container pt-3">
                  <button className="overflow-hidden bg-black w-full max-w-[200px] relative flex items-center justify-center group self-start lg:mt-auto">
                    <Link
                      to={`${el._id}`}
                      className="w-full h-full px-5 py-2 group"
                    >
                      <span className="text-white pe-[60px]">More</span>
                      <em className="absolute w-[10px] bg-white h-[1px] top-2/4 right-10 transition-all duration-300 group-hover:w-[60px]"></em>
                      <div className="h-2/4 w-full bg-white/[0.2] absolute tranisition-all duration-300 top-0 left-[-100%] group-hover:left-0"></div>
                      <div className="h-2/4 w-full bg-white/[0.2] absolute tranisition-all duration-300 bottom-0 right-[-100%] group-hover:right-0"></div>
                    </Link>
                  </button>
                </div>
              </div>
              <div className="news-card-right aspect-[5/3] w-1/2 ps-3">
                <img
                  className="w-full h-full  object-cover"
                  src={el.images[0]}
                  alt={`news-${i + 1}`}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewsPage;
