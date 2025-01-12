import React, { useState } from "react";
import { useGetAllHerosQuery, useCreateHeroMutation } from "../../data/heroSlice";

const AddHero = () => {
  const { data: allHeros } = useGetAllHerosQuery();
  const [createHero] = useCreateHeroMutation();
  const [imageFile, setImageFile] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [text, setText] = useState({ ge: "", en: "" });
  const [statusMessage, setStatusMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleImageChange2 = (e) => {
    setImageFile2(e.target.files[0]);
  };

  const handleTextChange = (lang, e) => {
    setText((prev) => ({
      ...prev,
      [lang]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!text.ge || !text.en) {
      setStatusMessage({ type: "error", text: "Please fill in both text fields." });
      return;
    }
    if (!imageFile) {
      setStatusMessage({ type: "error", text: "Please select an image file." });
      return;
    }

    const formData = new FormData();
    formData.append("text[ge]", text.ge);
    formData.append("text[en]", text.en);
    formData.append("images", imageFile);
    formData.append("images", imageFile2);

    setIsLoading(true);
    try {
      await createHero(formData).unwrap();
      setStatusMessage({ type: "success", text: "Hero created successfully!" });
      setText({ ge: "", en: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Failed to create hero:", error);
      setStatusMessage({ type: "error", text: "Failed to create hero." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-5">
      {statusMessage && (
        <div
          className={`p-4 mb-4 text-sm rounded ${
            statusMessage.type === "error"
              ? "bg-red-100 text-red-800 border-red-400"
              : "bg-green-100 text-green-800 border-green-400"
          } border`}
        >
          {statusMessage.text}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="add-image" className="block text-sm font-medium text-gray-700">
          Add Image 1
        </label>
        <input
          type="file"
          id="add-image"
          onChange={handleImageChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="add-image" className="block text-sm font-medium text-gray-700">
          Add Image 2
        </label>
        <input
          type="file"
          id="add-image"
          onChange={handleImageChange2}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="add-ge-text" className="block text-sm font-medium text-gray-700">
          Add Georgian Text
        </label>
        <input
          type="text"
          id="add-ge-text"
          value={text.ge}
          onChange={(e) => handleTextChange("ge", e)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="add-en-text" className="block text-sm font-medium text-gray-700">
          Add English Text
        </label>
        <input
          type="text"
          id="add-en-text"
          value={text.en}
          onChange={(e) => handleTextChange("en", e)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`px-4 py-2 font-medium text-white rounded shadow-sm ${
            isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-green-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "Add"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddHero;
