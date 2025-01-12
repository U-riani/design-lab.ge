import React, { useState } from "react";
import {
  useDeleteDesignerMutation,
  useGetAllDesignersQuery,
  useUpdateDesignerMutation,
} from "../../data/designersSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBehance,
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

const EditDesigners = () => {
  const { i18n } = useTranslation();
  const { data: allDesigners, error, isLoading } = useGetAllDesignersQuery();
  const [deleteDesigner, { isLoading: isDeleting }] =
    useDeleteDesignerMutation();
  const [updateDesigner, { isLoading: isUpdating }] =
    useUpdateDesignerMutation();
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateCol, setUpdateCol] = useState(null);
  const [text, setText] = useState({ ge: "", en: "" });
  const [name, setName] = useState({ ge: "", en: "" });
  const [image, setImage] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [projectPhoto, setProjectPhoto] = useState(null);
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [behance, setBehance] = useState("");
  const [activeStatus, setActiveStatus] = useState(false);
  const [companyPerson, setCompanyPerson] = useState("");
  const [id, setId] = useState(null);

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleProjectPhotoChange = (e) => {
    setProjectPhoto(e.target.files[0]);
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

  const handleCompanynameChange = (e) => {
    setCompanyPerson(e.target.value);
  };

  const handleStatusChange = (e) => {
    setActiveStatus(e.target.checked);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const images = [profilePhoto, projectPhoto];
      await updateDesigner({
        id,
        text,
        name,
        companyPerson,
        images,
        facebook,
        instagram,
        behance,
        activeStatus,
      }).unwrap();
      alert("Designer updated successfully!");
      setText({ ge: "", en: "" });
      setName({ ge: "", en: "" });
      setImage(null);
      setFacebook("");
      setInstagram("");
      setBehance("");
      setActiveStatus(false);
      setShowUpdate(false);
      setUpdateCol(null);
    } catch (error) {
      alert("Designer Update error:", error.message);
    }
  };

  const handleShowUpdate = (item) => {
    setShowUpdate(!showUpdate);
    setName(item.name);
    setText(item.text);
    setFacebook(item.facebook);
    setInstagram(item.instagram);
    setBehance(item.behance);
    setId(item._id);
    setUpdateCol(updateCol === item._id ? null : item._id);
    setActiveStatus(item.activeStatus === true || false);
    setCompanyPerson(item.companyPerson);
    setProfilePhoto(item.images[0]);
    setProjectPhoto(item.images[1]);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDesigner(id).unwrap();
    } catch (error) {
      console.log("Designer Delete error:", error.message);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      {isLoading && (
        <div className="flex justify-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          Failed to load designers: {error.message}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allDesigners &&
          allDesigners.map((item) => (
            <div
              key={item._id}
              className="border-2 border-gray-300 rounded-lg shadow-md p-4"
            >
              <div className="relative h-[200px]">
                <div className="w-full h-[80%] bg-gray-200  overflow-hidden">
                  <img
                    src={item.images[1] || '/images/notAvaliableImage.jpg'}
                    alt="Project"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute aspect-[1/1] h-[40%] bottom-0 left-1/2 translate-x-[-50%]">
                  <img
                    src={item.images[0] || '/images/notAvaliableImage.jpg'}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>
              </div>
              <div className="pt-5 pb-4">
                <h3 className="text-xl font-bold">{item.name[i18n.language]}</h3>
                <p>{item.text[i18n.language]}</p>
                <div className="flex space-x-2 mt-3">
                  <a
                    href={item.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    <FontAwesomeIcon icon={faBehance} />
                  </a>
                  <a
                    href={item.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                  <a
                    href={item.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleShowUpdate(item)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
                {item.activeStatus ? (
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md">
                    Active
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded-md" disabled>
                    Not Active
                  </button>
                )}
              </div>
              {updateCol === item._id && (
                <form onSubmit={handleSubmitUpdate} className="mt-4">
                  <div>
                    <label htmlFor="profImg">Profile Image</label>
                    <input
                      id="profImg"
                      type="file"
                      onChange={handleProfilePhotoChange}
                      className="block w-full mb-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="projImg">Project Image</label>
                    <input
                      id="projImg"
                      type="file"
                      onChange={handleProjectPhotoChange}
                      className="block w-full mb-2"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="person">Person</label>
                      <input
                        id="person"
                        type="radio"
                        name="companyPerson"
                        value="person"
                        checked={companyPerson === "person"}
                        onChange={(e) => setCompanyPerson(e.target.value)}
                        className="mb-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="company">Company</label>
                      <input
                        id="company"
                        type="radio"
                        name="companyPerson"
                        value="company"
                        checked={companyPerson === "company"}
                        onChange={(e) => setCompanyPerson(e.target.value)}
                        className="mb-2"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      value={name.ge}
                      onChange={(e) => handleNameChange("ge", e)}
                      className="block w-full mb-2 p-2 border border-gray-300 rounded"
                      placeholder="Georgian Name"
                    />
                    <input
                      value={name.en}
                      onChange={(e) => handleNameChange("en", e)}
                      className="block w-full mb-2 p-2 border border-gray-300 rounded"
                      placeholder="English Name"
                    />
                    <textarea
                      value={text.ge}
                      onChange={(e) => handleTextChange("ge", e)}
                      className="block w-full mb-2 p-2 border border-gray-300 rounded"
                      placeholder="Georgian Text"
                    />
                    <textarea
                      value={text.en}
                      onChange={(e) => handleTextChange("en", e)}
                      className="block w-full mb-2 p-2 border border-gray-300 rounded"
                      placeholder="English Text"
                    />
                    <input
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      className="block w-full mb-2 p-2 border border-gray-300 rounded"
                      placeholder="Facebook URL"
                    />
                    <input
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      className="block w-full mb-2 p-2 border border-gray-300 rounded"
                      placeholder="Instagram URL"
                    />
                    <input
                      value={behance}
                      onChange={(e) => setBehance(e.target.value)}
                      className="block w-full mb-2 p-2 border border-gray-300 rounded"
                      placeholder="Behance URL"
                    />
                    <div className="mb-2">
                      <label className="inline-block mr-2">Active Status</label>
                      <input
                        type="checkbox"
                        checked={activeStatus}
                        onChange={handleStatusChange}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md"
                    >
                      {isUpdating ? "Saving..." : "Save Update"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default EditDesigners;
