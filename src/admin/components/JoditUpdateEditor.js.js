import React, { useState, useRef, useEffect, Suspense } from "react";
import { useGetSingleNewsQuery, useUpdateNewsMutation } from "../../data/newsSlice";
import { useParams } from "react-router-dom";

// Lazy load the JoditEditor component
const JoditEditor = React.lazy(() => import("jodit-react"));

const JoditUpdateEditor = () => {
  const { newsId } = useParams();
  const { data: news, isLoading, error } = useGetSingleNewsQuery(newsId);
  const [titleGe, setTitleGe] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [existingImages, setExistingImages] = useState([]); // Store existing images
  const [newImages, setNewImages] = useState([]); // Store new images to be added
  const [editorContentGe, setEditorContentGe] = useState("");
  const [editorContentEn, setEditorContentEn] = useState("");
  const editorRefGe = useRef(null);
  const editorRefEn = useRef(null);
  const fileInputRef = useRef(null);

  const [updateNews] = useUpdateNewsMutation();

  useEffect(() => {
    if (news) {
      setTitleGe(news.title.ge);
      setTitleEn(news.title.en);
      setEditorContentGe(news.text.ge);
      setEditorContentEn(news.text.en);
      setExistingImages(news.images || []);
    }
  }, [news]);

  const handleTitleEnChange = (e) => setTitleEn(e.target.value);
  const handleTitleGeChange = (e) => setTitleGe(e.target.value);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = async () => {
    try {
      await updateNews({
        id: news._id,
        title: { ge: titleGe, en: titleEn },
        text: { ge: editorContentGe, en: editorContentEn },
        images: newImages,
      }).unwrap();
      alert("News updated successfully!");
      handleClearContent();
    } catch (error) {
      console.log("Error:", error.message);
      alert("Failed to update content: " + error.message);
    }
  };

  const handleClearContent = () => {
    setTitleEn("");
    setTitleGe("");
    setNewImages([]);
    setEditorContentGe("");
    setEditorContentEn("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
      url: "https://localhost:5000/api/upload",
      format: "json",
      method: "POST",
      process: (resp) => ({ files: [resp.url] }),
    },
    buttons: ["bold", "italic", "underline", "link", "ul", "ol", "image", "align", "undo", "redo", "hr"],
    minHeight: 400,
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit News Article</h2>

      <label htmlFor="titleGe" className="block font-medium mb-2">Title (Georgian)</label>
      <input
        id="titleGe"
        type="text"
        placeholder="Enter news title (Georgian)"
        value={titleGe}
        onChange={handleTitleGeChange}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />

      <label htmlFor="image" className="block font-medium mb-2">Upload Images</label>
      <input
        id="image"
        type="file"
        ref={fileInputRef}
        multiple
        onChange={handleImageChange}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />

      {/* Display existing and new images */}
      <div className="mb-4">
        <h5 className="font-medium mb-2">Existing Images:</h5>
        <div className="flex flex-wrap gap-4">
          {existingImages.map((img, index) => (
            <img key={index} src={img} alt="Existing" className="w-32 h-32 object-cover" />
          ))}
        </div>
        <h5 className="font-medium mt-4 mb-2">New Images:</h5>
        <div className="flex flex-wrap gap-4">
          {newImages.map((file, index) => (
            <img key={index} src={URL.createObjectURL(file)} alt="New" className="w-32 h-32 object-cover" />
          ))}
        </div>
      </div>

      <label className="block font-medium mb-2">Content (Georgian)</label>
      <Suspense fallback={<div>Loading Editor...</div>}>
        <JoditEditor
          ref={editorRefGe}
          value={editorContentGe}
          config={config}
          onBlur={(newContent) => setEditorContentGe(newContent)}
          className="border border-gray-300 rounded-md mb-4"
        />
      </Suspense>

      <label htmlFor="titleEn" className="block font-medium mb-2">Title (English)</label>
      <input
        id="titleEn"
        type="text"
        placeholder="Enter news title (English)"
        value={titleEn}
        onChange={handleTitleEnChange}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />

      <label className="block font-medium mb-2">Content (English)</label>
      <Suspense fallback={<div>Loading Editor...</div>}>
        <JoditEditor
          ref={editorRefEn}
          value={editorContentEn}
          config={config}
          onBlur={(newContent) => setEditorContentEn(newContent)}
          className="border border-gray-300 rounded-md mb-4"
        />
      </Suspense>

      <div className="mt-4 flex gap-4">
        <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Update News Article
        </button>
        <button onClick={handleClearContent} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
          Clear Content
        </button>
      </div>
    </div>
  );
};

export default JoditUpdateEditor;
