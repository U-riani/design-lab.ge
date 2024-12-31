import React from "react";
import SpaceComponent from "../components/SpaceComponent";
import { useParams } from "react-router-dom";
import { useGetSingleNewsQuery } from "../data/newsSlice";
import { useTranslation } from "react-i18next";
import SingleNewsCarousel from "../components/SingleNewsCarousel";

const SingleNewsPage = () => {
  const { newsId } = useParams();
  const { t, i18n } = useTranslation();

  const { data: news, error, isLoading } = useGetSingleNewsQuery(newsId);
  console.log(news);

  if (isLoading) {
    return (
      <div className="singleNewsComponent text-center">
        <div className="space-component-container w-full">
          <SpaceComponent data={{ data: t("news") }} />
        </div>
        <div animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="singleNewsComponent">
        <div className="space-component-container w-full">
          <SpaceComponent data={{ data: t("news") }} />
        </div>
        <div variant="danger">Error fetching news: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="single-news-page-container w-full flex flex-col items-center">
      <div className="space-component-container w-full">
        <SpaceComponent data={{ data: t("news") }} />
      </div>
      {news?.length === 0 ? (
        <p>No news articles available.</p>
      ) : (
        <div className="single-news-page-inner-container bg-[#f9f9f9] p-5 my-10">
          <div className="single-news-card bg-white border-[1px] px-3 py-2">
            <div className="single-news-card-top">
              <div className="single-news-card-carousel-container pt-2 mb-10">
                <SingleNewsCarousel data={news.images} />
              </div>
              <div className="single-news-card-title-container">
                <h3 className="text-center font-semibold pb-3 text-2xl">
                  {news.title[i18n.language]}
                </h3>
              </div>
            </div>
            <div className="single-news-card-bottom">
              <div
                className="single-news-card-paragraph-container"
                dangerouslySetInnerHTML={{
                  __html: news.text[i18n.language],
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleNewsPage;
