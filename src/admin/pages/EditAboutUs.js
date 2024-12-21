import React, { useState, useRef, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
} from "../../data/aboutUsSlice";

const JoditEditor = React.lazy(() => import("jodit-react"));

const EditAboutUs = () => {
  const { data, isLoading, error, refetch } = useGetAboutUsQuery();
  const [updateAboutUs] = useUpdateAboutUsMutation();

  const editorRefEn = useRef(null);
  const editorRefGe = useRef(null);
  const [editorContentGe, setEditorContentGe] = useState("");
  const [editorContentEn, setEditorContentEn] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [oldImageSrc, setOldImageSrc] = useState("");
  const [startLoading, setStartLoading] = useState(false);
  const [id, setId] = useState(null);

  const fileInputRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setEditorContentGe(data[0].text.ge);
      setEditorContentEn(data[0].text.en);
      setOldImageSrc(data[0].image[0]);
      setId(data[0]._id);
    }
  }, [data]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setStartLoading(true);
    try {
      const enText = editorRefEn?.current.value;
      const geText = editorRefGe?.current.value;

      const response = await updateAboutUs({
        id,
        enText,
        geText,
        imageFile,
      }).unwrap();

      if (response._id) {
        alert("Success!");
        refetch();
        setStartLoading(false);
      }
    } catch (error) {
      alert(error);
      setStartLoading(false);
    }
  };

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      url: "https://localhost:5000/api/upload",
      format: "json",
      method: "PATCH",
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
    <div className="container mx-auto pt-10">
      <h2 className="text-2xl font-bold mb-6">განაახლე ჩვენს შესახებ</h2>
      <div className="mb-6">
        <div className=" overflow-hidden">
          <img
            src={oldImageSrc}
            alt=""
            className="object-cover w-[150px] object-contain"
          />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Upload Images
        </label>
        <input
          id="image"
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Content (Georgian)
        </label>
        <Suspense fallback={<div>Loading Editor...</div>}>
          <JoditEditor
            ref={editorRefGe}
            value={editorContentGe}
            config={config}
            onBlur={(newContent) => setEditorContentGe(newContent)}
            className="mt-2"
          />
        </Suspense>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Content (English)
        </label>
        <Suspense fallback={<div>Loading Editor...</div>}>
          <JoditEditor
            ref={editorRefEn}
            value={editorContentEn}
            config={config}
            onBlur={(newContent) => setEditorContentEn(newContent)}
            className="mt-2"
          />
        </Suspense>
      </div>
      <div className="flex justify-end">
        {startLoading && <p className="text-blue-500 mr-4">Loading...</p>}
        <button
          disabled={startLoading}
          onClick={handleSubmit}
          className={`px-6 py-2 bg-blue-500 text-white rounded-md shadow-sm ${
            startLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default EditAboutUs;
