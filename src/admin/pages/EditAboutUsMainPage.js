import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetAboutUsMainPageQuery,
  useUpdateAboutUsMainPageMutation,
} from "../../data/aboutUsSlice";

// const JoditEditor = React.lazy(() => import("jodit-react"));

const EditAboutUsMainPage = () => {
  const { data, isLoading, error, refetch } = useGetAboutUsMainPageQuery();
  const [updateAboutUsMainPage] = useUpdateAboutUsMainPageMutation();

  const editorRefEn = useRef(null);
  const editorRefGe = useRef(null);
  const [editorContentGe, setEditorContentGe] = useState("");
  const [editorContentEn, setEditorContentEn] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [oldImageSrc, setOldImageSrc] = useState("");
  const [oldImageSrc2, setOldImageSrc2] = useState("");
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
      setOldImageSrc(data[0].image[0] || "");
      setOldImageSrc2(data[0].image[1] || "");
      setId(data[0]._id);
    }
  }, [data]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    // console.log(imageFile);
  };
  const handleImageChange2 = (e) => {
    setImageFile2(e.target.files[0]);
    // console.log(imageFile);
  };

  const handleSubmit = async () => {
    setStartLoading(true);
    try {
      const enText = editorContentEn; // Get the value directly from state
      const geText = editorContentGe; // Get the value directly from state

      const response = await updateAboutUsMainPage({
        id,
        enText,
        geText,
        imageFile,
        imageFile2,
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

  return (
    <div className="w-full">
      <h2 className="pb-3">განაახლე ჩვენს შესახებ მთავარ გვერდზე</h2>
      <div className="w-full h-[200px] flex ">
        <div className="w-1/2 h-full">
          <img
            className="object-cover w-full h-full"
            src={oldImageSrc}
            alt=""
          />
        </div>
        <div className="w-1/2 full">
          <img
            className="object-cover w-full h-full"
            src={oldImageSrc2}
            alt=""
          />
        </div>
      </div>
      <div className="w-full flex">
        <div className="my-3">
          <label htmlFor="image">Upload Image 1</label>
          <input
            id="image"
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleImageChange}
            className="form-control mb-3"
          />
        </div>
        <div className="my-3">
          <label htmlFor="image">Upload Image 2</label>
          <input
            id="image"
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleImageChange2}
            className="form-control mb-3"
          />
        </div>
      </div>
      <div className="flex flex-col mb-3">
        <label>Content (Georgian)</label>
        {/* Suspense is used to wrap the lazy-loaded component */}
        <textarea
          className="border"
          name="ge-aboutus-main-page"
          id="ge-about-us-main-page"
          rows={5}
          value={editorContentGe}
          onChange={(e) => setEditorContentGe(e.target.value)} // Correct usage
        ></textarea>
      </div>
      <div className=" flex flex-col mb-3">
        <label>Content (English)</label>
        {/* Suspense is used to wrap the lazy-loaded component */}
        <textarea
          className="border"
          name="en-aboutus-main-page"
          id="en-about-us-main-page"
          rows={5}
          value={editorContentEn}
          onChange={(e) => setEditorContentEn(e.target.value)} // Correct usage
        ></textarea>
      </div>
      <div className="w-full">
        {startLoading && <p>Loading ...</p>}
        <button
          disabled={startLoading}
          onClick={handleSubmit}
          className="w-fit px-4 py-2 mb-5 rounded-lg bg-green-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditAboutUsMainPage;
