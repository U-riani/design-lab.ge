import React, { useState } from "react";
import {
  useDeletePartnerMutation,
  useGetAllPartnersQuery,
  useUpdatePartnerMutation,
} from "../../data/partnersSlice";

const EditPartners = () => {
  const { data: allPartners, error, isLoading } = useGetAllPartnersQuery();
  const [deletePartner, { isLoading: isDeleting }] = useDeletePartnerMutation();
  const [updatePartner, { isLoading: isUpdating }] = useUpdatePartnerMutation();
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateCol, setUpdateCol] = useState(null);
  const [text, setText] = useState({ ge: "", en: "" });
  const [name, setName] = useState({ ge: "", en: "" });
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  console.log(allPartners);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePartner({ id, text, name, image, websiteUrl }).unwrap();
      alert("Partner updated successfully!");
      // Reset form and hide update section after success
      setText({ ge: "", en: "" });
      setName({ ge: "", en: "" });
      setImage(null);
      setShowUpdate(false);
      setUpdateCol(null);
      setWebsiteUrl("");
    } catch (error) {
      alert("Update error:", error.message);
    }
  };

  const handleShowUpdate = (item) => {
    setShowUpdate(!showUpdate);
    setName(item.name);
    setText(item.text);
    setId(item._id);
    setUpdateCol(updateCol === item._id ? null : item._id);
    setWebsiteUrl(item.websiteUrl ? item.websiteUrl : "");
  };

  const handleDelete = async (id) => {
    try {
      await deletePartner(id).unwrap();
    } catch (error) {
      console.log("Delete error:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 mt-4">
        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin h-8 w-8 border-t-4 border-blue-500 rounded-full"></div>
          </div>
        )}
        {error && (
          <div className="bg-red-500 text-white p-2 rounded">
            Failed to load partners: {error.message}
          </div>
        )}
        {allPartners &&
          allPartners.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow-md my-3"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full flex justify-center">
                  <img
                    className="w-[150px] h-[150px] lg:w-[300px] lg:h-[300px] rounded-lg"
                    src={item.image[0]}
                    alt="Partner"
                  />
                </div>
                <div>
                  <p>{item.name?.ge}</p>
                  <p>{item.name?.en}</p>
                  <p>{item.text?.ge}</p>
                  <p>{item.text?.en}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleShowUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDelete(item._id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                  {updateCol === item._id && (
                    <form
                      onSubmit={handleSubmitUpdate}
                      className="mt-4 space-y-4"
                    >
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded"
                      />
                      <input
                        value={name.ge}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="ქართული სათაური"
                        onChange={(e) => handleNameChange("ge", e)}
                      />
                      <input
                        value={name.en}
                        onChange={(e) => handleNameChange("en", e)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="English name"
                      />
                      <textarea
                        value={text.ge}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="ქართული ტექსტი"
                        onChange={(e) => handleTextChange("ge", e)}
                      />
                      <textarea
                        value={text.en}
                        onChange={(e) => handleTextChange("en", e)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="English text"
                      />
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Website Url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                      />
                      <button
                        type="submit"
                        disabled={isUpdating}
                        className="w-full bg-green-500 text-white py-2 rounded"
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
    </div>
  );
};

export default EditPartners;
