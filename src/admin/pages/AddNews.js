import React, { useState, useRef, Suspense, lazy } from "react";
import { useCreateNewsMutation } from "../../data/newsSlice";
import { useTranslation } from "react-i18next";

// Lazy load the JoditEditor
const JoditEditor = lazy(() => import("jodit-react"));

const AddNews = () => {
  const [title, setTitle] = useState({ en: "", ge: "" });
  const [imageFiles, setImageFiles] = useState([]);
  const editorRefEn = useRef(null);
  const editorRefGe = useRef(null);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const [createNews] = useCreateNewsMutation();

  const handleTitleChange = (lang, e) => {
    setTitle((prev) => ({
      ...prev,
      [lang]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const editorContentEn = editorRefEn.current?.value || "";
    const editorContentGe = editorRefGe.current?.value || "";

    if (!editorContentEn || !editorContentGe) {
      alert("Please provide content in both English and Georgian.");
      return;
    }

    const formData = new FormData();
    formData.append("title[en]", title.en);
    formData.append("title[ge]", title.ge);
    formData.append("text[en]", editorContentEn);
    formData.append("text[ge]", editorContentGe);

    imageFiles.forEach((file) => {
      formData.append("images", file); // Append images for upload
    });

    try {
      await createNews(formData).unwrap();
      alert("News saved successfully!");
      handleClearContent();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save content: " + (error.data?.message || error.message));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const handleClearContent = () => {
    setTitle({ en: "", ge: "" });
    setImageFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (editorRefEn.current) editorRefEn.current.value = "";
    if (editorRefGe.current) editorRefGe.current.value = "";
  };

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      url: "https://design-union-backend.vercel.app/api/upload",
      format: "json",
      method: "POST",
      process: (resp) => ({ files: [resp.url] }),
    },
    buttons: ["bold", "italic", "underline", "link", "ul", "ol", "image", "align", "undo", "redo", "hr"],
    minHeight: 400,
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6">{t("Add News")}</h1>

      {/* Title Fields */}
      <label htmlFor="titleGe" className="block text-lg font-semibold mb-2">
        {t("Title (Georgian)")}
      </label>
      <input
        id="titleGe"
        type="text"
        placeholder={t("Title (Georgian)")}
        value={title.ge}
        onChange={(e) => handleTitleChange("ge", e)}
        className="w-full p-3 border border-gray-300 rounded mb-3"
      />

      <label htmlFor="image" className="block text-lg font-semibold mb-2">
        {t("Upload Images")}
      </label>
      <input
        id="image"
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleImageChange}
        className="w-full p-3 border border-gray-300 rounded mb-3"
      />

      {/* Preview uploaded images */}
      <div className="mb-6">
        {imageFiles.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {imageFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Editor (Georgian) */}
      <div className="editor-section mb-6">
        <label className="block text-lg font-semibold mb-2">{t("Content (Georgian)")}</label>
        <Suspense fallback={<div>Loading editor...</div>}>
          <JoditEditor ref={editorRefGe} config={config} />
        </Suspense>
      </div>

      {/* Title Fields (English) */}
      <label htmlFor="titleEn" className="block text-lg font-semibold mb-2">
        {t("Title (English)")}
      </label>
      <input
        id="titleEn"
        type="text"
        placeholder={t("Title (English)")}
        value={title.en}
        onChange={(e) => handleTitleChange("en", e)}
        className="w-full p-3 border border-gray-300 rounded mb-3"
      />

      {/* Content Editor (English) */}
      <div className="editor-section mb-6">
        <label className="block text-lg font-semibold mb-2">{t("Content (English)")}</label>
        <Suspense fallback={<div>Loading editor...</div>}>
          <JoditEditor ref={editorRefEn} config={config} />
        </Suspense>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {t("Save News Article")}
        </button>
        <button
          onClick={handleClearContent}
          className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          {t("Clear Content")}
        </button>
      </div>
    </div>
  );
};

export default AddNews;
