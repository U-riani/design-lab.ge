import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SpaceComponent from "../components/SpaceComponent";
import DesignersCard from "../components/DesignersCard";
import { useCreateDesignerMutation } from "../data/designersSlice";

const Registration = () => {
  const maxSize = 10 * 1024 * 1024;
  const [createDesigner] = useCreateDesignerMutation();
  const { t } = useTranslation();
  const [name, setName] = useState({ ge: "" });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [projectPhoto, setProjectPhoto] = useState(null);
  const [behance, setBehance] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [companyPerson, setCompanyPerson] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", variant: "" });

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
    console.log(profilePhoto);
  };

  const handleProjectPhotoChange = (e) => {
    setProjectPhoto(e.target.files[0]);
  };

  const clearForm = () => {
    setName({ ge: "" });
    setEmail("");
    setPhone("");
    setProfilePhoto(null);
    setProjectPhoto(null);
    setBehance("");
    setFacebook("");
    setInstagram("");
    setCompanyPerson("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage({ text: "", variant: "" });

    const formData = new FormData();
    formData.append("name[ge]", name.ge);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);
    formData.append("behance", behance);
    formData.append("companyPerson", companyPerson);

    if (profilePhoto) formData.append("images", profilePhoto);
    if (projectPhoto) formData.append("images", projectPhoto);

    try {
      if (name.ge !== "" && companyPerson !== "" && email !== "") {
        await createDesigner(formData).unwrap();
        setMessage({ text: "Successfully registered", variant: "success" });
        clearForm();
      } else {
        setMessage({ text: t("fillAllFields"), variant: "info" });
      }
    } catch (error) {
      setMessage({
        text: "Technical issue, please try again",
        variant: "danger",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <SpaceComponent data={{ data: t("registration") }} className="w-full" />
      <div className="flex justify-center py-8">
        <form className="w-full max-w-2xl lg:max-w-[800px] space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div className="lg:flex lg:items-center lg:justify-between space-y-[20px] lg:space-y-0 lg:space-x-[20px]">
            {" "}
            <div className="w-full form-control">
              <input
                id="fullName"
                type="text"
                value={name.ge}
                onChange={(e) => setName({ ge: e.target.value })}
                placeholder={""}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="fullName"
              >
                {t("fullName")}
              </label>
            </div>
            <div className="flex w-full h-[55px] border border-[#808080] rounded-[5px]">
              <button
                type="button"
                onClick={() => setCompanyPerson("person")}
                className={`border-r-[1px] border-[#6C757D] py-2 px-4  w-full rounded-e-none	  ${
                  companyPerson === "person"
                    ? "bg-[#6C757D] text-white"
                    : "text-gray-700"
                }`}
              >
                {t("person")}
              </button>
              <button
                type="button"
                onClick={() => setCompanyPerson("company")}
                className={`py-2 px-4  w-full rounded-s-none ${
                  companyPerson === "company"
                    ? "bg-[#6C757D] text-white"
                    : "text-gray-700"
                }`}
              >
                {t("company")}
              </button>
            </div>
          </div>
          <div className="lg:flex lg:items-center lg:justify-between space-y-[20px] lg:space-y-0 lg:space-x-[20px]">
            <div className="w-full form-control">
              <input
                autoComplete="email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                {t("email")}
              </label>
            </div>

            <div className="w-full form-control">
              <input
                autoComplete="tel"
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder=""
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phone"
              >
                {t("phoneNumber")}
              </label>
            </div>
          </div>
          <div className="lg:flex lg:items-center lg:justify-between space-y-[20px] lg:space-y-0 lg:space-x-[20px]">
            <div className="w-full form-control image-form-control">
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
                className="image-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <label
                htmlFor="profile-image"
                className="block text-sm font-medium text-gray-700"
              >
                {profilePhoto !== null && profilePhoto.size < maxSize
                  ? t("uploadedProfilePhoto")
                  : profilePhoto !== null && profilePhoto.size > maxSize
                  ? t("errorPhotoSize")
                  : t("uploadProfilePhoto")}
                {profilePhoto && <span className="text-green-500 ps-2">✔</span>}
              </label>
            </div>

            <div className="w-full form-control image-form-control">
              <input
                id="project-image"
                type="file"
                accept="image/*"
                onChange={handleProjectPhotoChange}
                className="image-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <label
                htmlFor="project-image"
                className="block text-sm font-medium text-gray-700"
              >
                {projectPhoto !== null && projectPhoto.size < maxSize
                  ? t("uploadedProjectsPhoto")
                  : projectPhoto !== null && projectPhoto.size > maxSize
                  ? t("errorPhotoSize")
                  : t("uploadProjectsPhoto")}
                {projectPhoto && <span className="text-green-500 ps-2">✔</span>}
              </label>
            </div>
          </div>
          <div className="lg:flex lg:items-center lg:justify-between space-y-[20px] lg:space-y-0 lg:space-x-[10px]">
            <div className="w-full form-control">
              <input
                id="behance"
                type="url"
                value={behance}
                onChange={(e) => setBehance(e.target.value)}
                placeholder=""
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="behance"
              >
                {companyPerson === "company" ? "Company Website" : "Behance"}
              </label>
            </div>
            <div className="w-full form-control">
              <input
                id="facebook"
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder=""
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="facebook"
              >
                Facebook
              </label>
            </div>
            <div className="w-full form-control">
              <input
                id="instagram"
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder=""
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="instagram"
              >
                Instagram
              </label>
            </div>
          </div>
          <div className="w-full flex justify-center pt-5">
            <DesignersCard
              data={{
                profilePhoto,
                projectPhoto,
                name: { ge: name.ge, en: name.en },
                instagram,
                facebook,
                behance,
                registration: "registration",
              }}
            />
          </div>

          <div className="flex w-full justify-center lg:!mt-0">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full max-w-[250px] py-3 bg-black text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isLoading ? t("loading") : t("submit")}
            </button>
          </div>

          {message.text && (
            <div
              className={`mt-4 p-4 rounded-md text-white ${
                message.variant === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Registration;
