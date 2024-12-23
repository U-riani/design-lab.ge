import React, { useState } from "react";
import {
  useDeleteHeroMutation,
  useGetAllHerosQuery,
  useUpdateHeroMutation,
} from "../../data/heroSlice";

const EditHero = () => {
  const { data: allHeros, error, isLoading } = useGetAllHerosQuery();
  const [deleteHero, { isLoading: isDeleting }] = useDeleteHeroMutation();
  const [updateHero, { isLoading: isUpdating }] = useUpdateHeroMutation();
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateCol, setUpdateCol] = useState(null);
  const [text, setText] = useState({ ge: "", en: "" });
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [id, setId] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleImageChange2 = (e) => {
    setImage2(e.target.files[0]);
  };

  const handleTextChange = (lang, e) => {
    setText((prev) => ({
      ...prev,
      [lang]: e.target.value,
    }));
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateHero({ id, text, image, image2 }).unwrap();
      alert("Hero updated successfully!");
      setText({ ge: "", en: "" });
      setImage(null);
      setShowUpdate(false);
      setUpdateCol(null);
    } catch (error) {
      alert("Update error: " + error.message);
    }
  };

  const handleShowUpdate = (item) => {
    setShowUpdate(!showUpdate);
    setText(item.text);
    setId(item._id);
    setUpdateCol(updateCol === item._id ? null : item._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteHero(id).unwrap();
    } catch (error) {
      console.log("Delete error:", error.message);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      {error && (
        <div className="bg-red-500 text-white p-4 rounded">
          Failed to load heroes: {error.message}
        </div>
      )}
      {allHeros &&
        allHeros.map((item) => (
          <div key={item._id} className="mb-6 border-b pb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full h-auto">
                <img
                  className="w-full rounded-md"
                  src={item.image[0]}
                  alt="Hero"
                />
              </div>
              <div className="w-full h-auto">
                <img
                  className="w-full rounded-md"
                  src={item.image[1]}
                  alt="Hero"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">{item.text?.ge}</p>
                <p className="text-lg text-gray-600">{item.text?.en}</p>
                <div className="flex space-x-4 mt-3">
                  <button
                    onClick={() => handleShowUpdate(item)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={isDeleting}
                    className={`px-4 py-2 rounded ${
                      isDeleting
                        ? "bg-red-300 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
                {updateCol === item._id && (
                  <form onSubmit={handleSubmitUpdate} className="mt-4 space-y-4">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="block w-full border rounded p-2"
                    />
                    <input
                      type="file"
                      onChange={handleImageChange2}
                      className="block w-full border rounded p-2"
                    />
                    <textarea
                      value={text.ge}
                      className="w-full border rounded p-2"
                      placeholder="ქართული ტექსტი"
                      onChange={(e) => handleTextChange("ge", e)}
                    />
                    <textarea
                      value={text.en}
                      onChange={(e) => handleTextChange("en", e)}
                      className="w-full border rounded p-2"
                      placeholder="English text"
                    />
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className={`px-4 py-2 rounded ${
                        isUpdating
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                    >
                      {isUpdating ? "Saving..." : "Save Update"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EditHero;
