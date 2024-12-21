import React, { useEffect } from "react";
import he from "he";

import { useGetAllNewsQuery } from "../../data/newsSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AllNews = () => {
  const { data: allNews, isLoading, error, refetch } = useGetAllNewsQuery();
  const { i18n } = useTranslation();

  const extractTextRegex = (html) => {
    const textOnly = html.replace(/<[^>]*>/g, " ");
    // Decode HTML entities
    return he.decode(textOnly);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-500 text-white p-4 rounded">
          Error fetching news: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col max-w-[800px]  gap-6 mx-auto">
        {allNews &&
          allNews.map((el, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-lg overflow-hidden mb-6 w-full"
            >
              <div className="flex flex-col md:flex-row">
                {/* Text container */}
                <div className="flex-1 p-4">
                  <h5 className="text-lg font-semibold mb-2">{el.title[i18n.language]}</h5>
                  <p className="text-gray-700 mb-4">{extractTextRegex(el.text[i18n.language])}</p>
                  <Link to={`${el._id}`}>
                    <button className=" text-white py-2 px-4 rounded bg-gray-800">
                      More
                    </button>
                  </Link>
                </div>

                {/* Image container */}
                <div className="flex-shrink-0 w-full md:w-1/3">
                  <img
                    src={el.images[0]}
                    alt="news"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllNews;
