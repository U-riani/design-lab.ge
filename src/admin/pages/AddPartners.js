import React, { useState } from "react";

import {
  useGetAllPartnersQuery,
  useCreatePartnerMutation,
} from "../../data/partnersSlice";

const AddPartners = () => {
  const { data: allPartners } = useGetAllPartnersQuery();
  const [createPartner] = useCreatePartnerMutation();
  const [imageFile, setImageFile] = useState(null);
  const [text, setText] = useState({ ge: "", en: "" });
  const [name, setName] = useState({ ge: "", en: "" });
  const [websiteUrl, setWebsiteUrl] = useState("");

  const [statusMessage, setStatusMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleNameChange = (lang, e) => {
    setName((prev) => ({
      ...prev,
      [lang]: e.target.value,
    }));
  };

  const handleTextChange = (lang, e) => {
    setText((prev) => ({
      ...prev,
      [lang]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!text.ge || !text.en) {
      setStatusMessage({
        type: "error",
        text: "Please fill in both text fields.",
      });
      return;
    }
    if (!imageFile) {
      setStatusMessage({ type: "error", text: "Please select an image file." });
      return;
    }

    const formData = new FormData();
    formData.append("name[ge]", name.ge);
    formData.append("name[en]", name.en);
    formData.append("text[ge]", text.ge);
    formData.append("text[en]", text.en);
    formData.append("websiteUrl", websiteUrl);
    formData.append("images", imageFile);

    setIsLoading(true);
    try {
      await createPartner(formData).unwrap();
      setStatusMessage({ type: "success", text: "Partner created successfully!" });
      setText({ ge: "", en: "" });
      setName({ ge: "", en: "" });
      setWebsiteUrl("");
      setImageFile(null);
    } catch (error) {
      console.error("Failed to create partner:", error);
      setStatusMessage({ type: "error", text: "Failed to create partner." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-8">
      {statusMessage && (
        <div
          className={`mb-4 p-4 rounded ${
            statusMessage.type === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="add-image" className="block font-semibold">
            Add Image
          </label>
          <input
            type="file"
            id="add-image"
            onChange={handleImageChange}
            className="block w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label htmlFor="add-ge-name" className="block font-semibold">
            Add Georgian Name
          </label>
          <input
            value={name.ge}
            type="text"
            id="add-ge-name"
            onChange={(e) => handleNameChange("ge", e)}
            className="block w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label htmlFor="add-en-name" className="block font-semibold">
            Add English Name
          </label>
          <input
            value={name.en}
            type="text"
            id="add-en-name"
            onChange={(e) => handleNameChange("en", e)}
            className="block w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label htmlFor="add-ge-text" className="block font-semibold">
            Add Georgian Text
          </label>
          <input
            value={text.ge}
            type="text"
            id="add-ge-text"
            onChange={(e) => handleTextChange("ge", e)}
            className="block w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label htmlFor="add-en-text" className="block font-semibold">
            Add English Text
          </label>
          <input
            value={text.en}
            type="text"
            id="add-en-text"
            onChange={(e) => handleTextChange("en", e)}
            className="block w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label htmlFor="add-website" className="block font-semibold">
            Add Website URL
          </label>
          <input
            value={websiteUrl}
            type="text"
            id="add-website"
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="block w-full border rounded p-2 mt-1"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`mt-4 px-6 py-2 rounded text-white ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AddPartners;
