import React, { useState, useRef, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useCreateAboutUsMutation } from "../../data/aboutUsSlice";

// Lazy load the JoditEditor
const JoditEditor = React.lazy(() => import("jodit-react"));

const AboutUs = () => {
  const editorRefEn = useRef(null);
  const editorRefGe = useRef(null);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const [createAboutUs] = useCreateAboutUsMutation();
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const enText = editorRefEn?.current.value;
      const geText = editorRefGe?.current.value;

      formData.append("images", imageFile); // Append images for upload
      formData.append("text[en]", enText);
      formData.append("text[ge]", geText);
      const response = await createAboutUs(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      url: "https://design-union-backend.vercel.app/api/upload",
      format: "json",
      method: "POST",
      process: (resp) => ({
        files: [resp.url],
      }),
    },
    buttons: [
      "bold",
      "italic",
      "underline",
      "link",
      "ul",
      "ol",
      "image",
      "align",
      "undo",
      "redo",
      "hr",
    ],
    minHeight: 400,
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">{t("Add About Us")}</h2>
      <div className="mb-6">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
          {t("Upload Images")}
        </label>
        <input
          id="image"
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("Content (Georgian)")}
        </label>
        {/* Suspense for lazy loading the JoditEditor */}
        <Suspense fallback={<div>{t("Loading editor...")}</div>}>
          <JoditEditor ref={editorRefGe} config={config} />
        </Suspense>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("Content (English)")}
        </label>
        {/* Suspense for lazy loading the JoditEditor */}
        <Suspense fallback={<div>{t("Loading editor...")}</div>}>
          <JoditEditor ref={editorRefEn} config={config} />
        </Suspense>
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 text-white bg-green-600 hover:bg-indigo-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
