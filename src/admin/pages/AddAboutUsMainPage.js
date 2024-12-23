import React, { useState, useRef, Suspense } from "react";
import { useCreateAboutUsMainPageMutation } from "../../data/aboutUsSlice";

// Lazy load the JoditEditor
const JoditEditor = React.lazy(() => import("jodit-react"));

const AddAboutUsMainPage = () => {
  const editorRefEn = useRef(null);
  const editorRefGe = useRef(null);
  const fileInputRef = useRef(null);
  
  const [createAboutUsMainPage]= useCreateAboutUsMainPageMutation();
  const [imageFile, setImageFile] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleImageChange2 = (e) => {
    setImageFile2(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const enText = editorRefEn?.current.value;
      const geText = editorRefGe?.current.value;

      formData.append("images", imageFile); // Append images for upload
      formData.append("images", imageFile2); // Append images for upload
      formData.append("text[en]", enText);
      formData.append("text[ge]", geText);
      const response = await createAboutUsMainPage(formData);
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
    <div>
      <h2>დაამატე ჩვენს შესახებ</h2>
      <div>
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
      <div>
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
      <div className="admin-add-about-us-jodit-container">
        <label>"Content (Georgian)</label>
        {/* Suspense for lazy loading the JoditEditor */}
        <Suspense fallback={<div>Loading editor...</div>}>
          <JoditEditor ref={editorRefGe} config={config} />
        </Suspense>
      </div>
      <div className="admin-add-about-us-jodit-container">
        <label>Content (English)</label>
        {/* Suspense for lazy loading the JoditEditor */}
        <Suspense fallback={<div>Loading editor...</div>}>
          <JoditEditor ref={editorRefEn} config={config} />
        </Suspense>
      </div>
      <div>
        <button onClick={handleSubmit}>add</button>
      </div>
    </div>
  );
};

export default AddAboutUsMainPage;
