import React, { useState, Suspense, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleNewsQuery, useDeleteNewsMutation } from "../../data/newsSlice";
import { useTranslation } from "react-i18next";
import SingleNewsCarousel from "../../components/SingleNewsCarousel.js";

// Lazy load JoditUpdateEditor component
const JoditUpdateEditor = lazy(() => import("../components/JoditUpdateEditor.js"));

const SingleNews = () => {
  const { newsId } = useParams();
  const { data: news, isLoading, error } = useGetSingleNewsQuery(newsId);
  const { i18n } = useTranslation();
  const [deleteNews] = useDeleteNewsMutation();
  const navigate = useNavigate();
  const [showEditor, setShowEditor] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteNews(id).unwrap();
      console.log("News deleted successfully");
      navigate("/admin/all-news");
    } catch (error) {
      console.error("Failed to delete news:", error);
    }
  };

  const confirmDelete = () => {
    handleDelete(newsId);
    setShowAlert(false);
  };

  const cancelDelete = () => {
    setShowAlert(false);
  };

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
      {!news ? (
        <p>No news articles available.</p>
      ) : (
        <div className="news-article mb-4 px-3">
          {/* Image Carousel */}
          <div className="pt-3 mb-4">
            <SingleNewsCarousel data={news.images} />
          </div>
          <div>
            <h4 className="text-center">{news.title[i18n.language]}</h4>
          </div>
          {/* Article Content */}
          <div
            className="article-body pb-5 pt-5"
            dangerouslySetInnerHTML={{
              __html: news.text[i18n.language] || news.text,
            }}
          />

          {/* Editor */}
          {showEditor && (
            <div className="flex justify-center my-6">
              <Suspense
                fallback={
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                  </div>
                }
              >
                <JoditUpdateEditor prop={news} />
              </Suspense>
            </div>
          )}

          {/* Admin Buttons */}
          <div className="flex justify-around my-4">
            <button
              onClick={() => setShowEditor(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded focus:outline-none"
            >
              UPDATE
            </button>
            <button
              onClick={() => setShowAlert(true)}
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-6 rounded focus:outline-none"
            >
              DELETE
            </button>
          </div>

          {/* Confirmation Alert */}
          {showAlert && (
            <div className="bg-yellow-500 text-white p-4 rounded mt-3">
              <div className="font-bold text-lg">Are you sure?</div>
              <p>
                This action cannot be undone. Please confirm if you want to
                proceed.
              </p>
              <div className="flex justify-end mt-3">
                <button
                  onClick={cancelDelete}
                  className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleNews;
