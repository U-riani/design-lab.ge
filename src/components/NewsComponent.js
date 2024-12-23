import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StackCardsSlider from "./StackCardsSlider";
// import { LastNewsContext } from "../context/LastNewsContext";
import { useTranslation } from "react-i18next";
import SpaceComponent from "./SpaceComponent";
import useScreenWidth from "../hooks/useScreenWidth";
import he from "he";
import { LastNewsContext } from "../context/LastNewsContext";

// import { useGetLast5NewsQuery } from "../data/newsSlice";

const NewsComponent = () => {
  const { last5News } = useContext(LastNewsContext);
  const { t, i18n } = useTranslation();
  const screenWidth = useScreenWidth();

  console.log(i18n.language);
  const extractTextRegex = (html) => {
    const textOnly = html.replace(/<[^>]*>/g, " ");
    // Decode HTML entities
    return he.decode(textOnly);
  };

  return (
    <div className="news-component mb-0 px-0">
      <div className="space-compoenent-container w-full">
        <SpaceComponent />
      </div>
      <div className="newsComponent-inner-container px-0 mt-3 md:mt-5">
        <div className="newsComponent-left-col pe-0 ps-0 mb-0 md:h-full ">
          <div className="newsComponent-carouse-text-container overflow-hidden pb-2 mb-2 mb-md-3 mb-lg-4 md:h-full">
            {last5News &&
              last5News.map((el, i) => (
                <div
                  key={i}
                  className={`p-2 newsComponent-carouse-text ${
                    el.activeNews === 0
                      ? "newsComponent-carouse-active-text"
                      : ""
                  }`}
                >
                  <h4
                    className="text-[12px] md:text-[16px] lg:text-[20px] font-semibold"
                    lang={i18n.language === "en" ? "en" : "ka"}
                  >
                    {el.title[i18n.language]}
                  </h4>

                  {screenWidth > 768 && (
                    <div className="h-full">
                      <p
                        className={`article-body newsComponent-article-body md:h-full lg:pt-2 text-[10px] md:text-[12px] lg:text-[14px]`}
                        lang={i18n.language === "en" ? "en" : "ka"}
                      >
                        {extractTextRegex(el.text[i18n.language])}
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* <div className="newsComponent-see-more-button-col hidden">
            <button className="overflow-hidden bg-black w-[100px] relative flex items-center justify-center group self-start lg:mt-auto">
              <Link
                to="/aboutUs"
                className="w-full h-full px-2 py-2 group flex"
              >
                <span className="text-white pe-[10px]">{t("more")}</span>
                <em className="absolute w-[10px] bg-white h-[1px] top-2/4 right-[10%] transition-all duration-300 group-hover:w-[60px]"></em>
                <div className="h-2/4 w-full bg-white/[0.2] absolute tranisition-all duration-300 top-0 left-[-100%] group-hover:left-0"></div>
                <div className="h-2/4 w-full bg-white/[0.2] absolute tranisition-all duration-300 bottom-0 right-[-100%] group-hover:right-0"></div>
              </Link>
            </button>
          </div> */}
          <div className="w-full flex justify-end mt-5 hidden md: md:flex md:justify-start">
            <button className="overflow-hidden bg-black w-[200px] relative flex items-center justify-center group self-start lg:mt-auto">
              <Link to="/news" className="w-full h-full px-5 py-2 group">
                <span className="text-white pe-[60px]">More</span>
                <em className="absolute w-[10px] bg-white h-[1px] top-2/4 right-10 transition-all duration-300 group-hover:w-[60px]"></em>
                <div className="h-2/4 w-full bg-white/[0.2] absolute tranisition-all duration-300 top-0 left-[-100%] group-hover:left-0"></div>
                <div className="h-2/4 w-full bg-white/[0.2] absolute tranisition-all duration-300 bottom-0 right-[-100%] group-hover:right-0"></div>
              </Link>
            </button>
          </div>
        </div>
        <div className="newsComponent-carousel-container ps-0 mb-0">
          <StackCardsSlider newsData={last5News} />
        </div>
        <div className="w-full flex justify-end mt-5 md:hidden">
          <button className="overflow-hidden bg-black w-[200px] relative flex items-center justify-center group self-start lg:mt-auto">
            <Link to="/news" className="w-full h-full px-5 py-2 group">
              <span className="text-white pe-[60px]">More</span>
              <em className="absolute w-[10px] bg-white h-[1px] top-2/4 right-10 transition-all duration-300 group-hover:w-[60px]"></em>
              <div className="h-2/4 w-full bg-white/[0.2] absolute tranisition-all duration-300 top-0 left-[-100%] group-hover:left-0"></div>
              <div className="h-2/4 w-full bg-white/[0.2] absolute tranisition-all duration-300 bottom-0 right-[-100%] group-hover:right-0"></div>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsComponent;
