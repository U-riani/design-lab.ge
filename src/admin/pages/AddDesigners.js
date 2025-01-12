import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCreateDesignerMutation } from "../../data/designersSlice";

const AdminAddDesigner = () => {
  const [createDesigner] = useCreateDesignerMutation();
  const { t } = useTranslation();
  const [name, setName] = useState({ ge: "", en: "" });
  const [text, setText] = useState({ ge: "", en: "" });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [projectPhoto, setProjectPhoto] = useState(null);
  const [behance, setBehance] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [companyPerson, setCompanyPerson] = useState("person");
  const [loading, setLoading] = useState(false);

  const clearOldData = () => {
    setName({ ge: "", en: "" });
    setText({ ge: "", en: "" });
    setEmail("");
    setPhone("");
    setProfilePhoto(null);
    setProjectPhoto(null);
    setBehance("");
    setFacebook("");
    setInstagram("");
    setCompanyPerson("person");
    setLoading(false);
  };

  const handleProfilePhotoChange = (e) => {
    if (e.target.files) setProfilePhoto(e.target.files[0]);
  };

  const handleProjectPhotoChange = (e) => {
    if (e.target.files) setProjectPhoto(e.target.files[0]);
  };

  const handleCompanyPersonChange = (e) => {
    setCompanyPerson(e.target.value);
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
    setLoading(true);
    const formData = new FormData();
    formData.append("name[ge]", name.ge);
    formData.append("name[en]", name.en);
    formData.append("text[ge]", text.ge);
    formData.append("text[en]", text.en);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);
    formData.append("behance", behance);
    formData.append("companyPerson", companyPerson);
    formData.append("activeStatus", "true");

    if (profilePhoto) formData.append("images", profilePhoto);
    if (projectPhoto) formData.append("images", projectPhoto);

    try {
      const response = await createDesigner(formData).unwrap();
      if (response) {
        setLoading(false);
        clearOldData();
        alert("Success !")
      }
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-center">
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {loading ? (
              <p>Loading ...</p>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name-ge"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("Full name")}
                  </label>
                  <input
                    id="name-ge"
                    value={name.ge}
                    onChange={(e) => handleNameChange("ge", e)}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder={t("Full name")}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="name-en"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("Full name ENG")}
                  </label>
                  <input
                    id="name-en"
                    value={name.en}
                    onChange={(e) => handleNameChange("en", e)}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder={t("Full name ENG")}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="text-ge"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("Text")}
                  </label>
                  <textarea
                    id="text-ge"
                    value={text.ge}
                    onChange={(e) => handleTextChange("ge", e)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder={t("Text in Georgian")}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="text-en"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("Text ENG")}
                  </label>
                  <textarea
                    id="text-en"
                    value={text.en}
                    onChange={(e) => handleTextChange("en", e)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder={t("Text in English")}
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    {t("Company / Person")}
                  </p>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="company"
                        checked={companyPerson === "company"}
                        onChange={handleCompanyPersonChange}
                        className="mr-2"
                      />
                      <span>{t("Company")}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="person"
                        checked={companyPerson === "person"}
                        onChange={handleCompanyPersonChange}
                        className="mr-2"
                      />
                      <span>{t("Person")}</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("Email address")}
                  </label>
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder={t("Email address")}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("Phone number")}
                  </label>
                  <input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder={t("Phone number")}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="profilePhoto"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("Upload profile photo")}
                  </label>
                  <input
                    id="profilePhoto"
                    onChange={handleProfilePhotoChange}
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  {profilePhoto && (
                    <img
                      src={URL.createObjectURL(profilePhoto)}
                      alt="Profile Preview"
                      className="w-24 mt-2"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="projectPhoto"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("Upload project photo")}
                  </label>
                  <input
                    id="projectPhoto"
                    onChange={handleProjectPhotoChange}
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  {projectPhoto && (
                    <img
                      src={URL.createObjectURL(projectPhoto)}
                      alt="Project Preview"
                      className="w-24 mt-2"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="behance"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("Behance link")}
                  </label>
                  <input
                    id="behance"
                    value={behance}
                    onChange={(e) => setBehance(e.target.value)}
                    type="url"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder={t("Behance link")}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="instagram"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("Instagram link")}
                  </label>
                  <input
                    id="instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    type="url"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder={t("Instagram link")}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="facebook"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("Facebook link")}
                  </label>
                  <input
                    id="facebook"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    type="url"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder={t("Facebook link")}
                  />
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className="w-full md:w-auto py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddDesigner;
