import React from "react";
import SpaceComponent from "../components/SpaceComponent";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <div className="contact-page w-full">
      <div className="space-component-container w-full">
        <SpaceComponent data={{ data: t("contact") }} />
      </div>
      <div className="contact-page-inner-container flex flex-col items-center w-full">
        <div className="contact-page-row contact-page-row-1 flex justify-center">
          <div className="contac-page-info-container w-fit lg:w-full px-5 py-5 my-10 bg-white flex flex-col items-center gap-[30px] lg:flex-row lg:items-start justify-evenly">
            <div className="contac-page-phone flex flex-col items-center px-4 py-2">
              
              <p><FontAwesomeIcon icon={faPhone} /> +995 593 53 86 08</p>
            </div>
            <div className="contac-page-email flex flex-col items-center   px-4 py-2">
              <p><FontAwesomeIcon icon={faEnvelope} /> info@design-lab.ge</p>
            </div>
            <div className="contac-page-address flex flex-col items-center  px-4 py-2">
 
              <p className="mb-0 text-center"><FontAwesomeIcon icon={faMapLocationDot} /> {t("tbilisiGeorgia")}</p>
              <p className="mb-0 text-center">{t("AnaPolitkovskaia")}</p>
            </div>
          </div>
        </div>
        <div className="contact-page-row w-full contact-page-row-2 bg-slate-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d446.09066973945335!2d44.713997371309766!3d41.72257637411822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4044736319db2c11%3A0x9474f44820609643!2sDesign-Lab!5e0!3m2!1sen!2sge!4v1734275618578!5m2!1sen!2sge&z=1"
            width="100%"
            height="450"
            style={{border:"0"}}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
