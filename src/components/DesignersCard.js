import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBehance,
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

const DesignersCard = ({ data }) => {
  const { i18n } = useTranslation();
  console.log(data);
  return (
    <div className="designers-card-compoenent w-[230px] min-w-[200px] h-[325px] bg-white mb-5 lg:mb-10">
      <div className="designers-car-inner-container w-full h-full">
        <div className="card-top relative w-full h-[60%]">
          <div className="card-background-image h-[75%] w-full">
            <img
              className="w-full h-full object-cover"
              src={data.images[1]}
              alt="background image"
            />
          </div>
          <div className="card-profile-image absolute h-1/2 aspect-[1/1] bottom-0 left-1/2 translate-x-[-50%] rounded-full overflow-hidden border-2 border-white">
            <img
              className="w-full h-full object-cover"
              src={data.images[0]}
              alt=""
            />
          </div>
        </div>
        <div className="card-text-icon-container h-[40%] flex flex-col justify-evenly">
          <div className="card-name px-2 pb-1">
            <p className="text-center font-semibold text-base px-3">
              {data.name[i18n.language].split(' ')[0]}
            </p>
            <p className="text-center font-semibold text-base px-3">
              {data.name[i18n.language].split(' ')[1]}
            </p>
          </div>
          <div className="card-icons-container flex flex-row justify-evenly">
            <div className="card-icon-container rounded-full w-[40px] h-[40px]">
              <a
                href={`${data.behance}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-icon border-2 rounded-full w-full h-full flex justify-center items-center group  "
              >
                <FontAwesomeIcon icon={faBehance} className="card-icon-svg" />
              </a>
            </div>
            <div className="card-icon-container rounded-full w-[40px] h-[40px]">
              <a
                href={`${data.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-icon border-2 rounded-full w-full h-full flex justify-center items-center group  "
              >
                <FontAwesomeIcon icon={faFacebookF} className="card-icon-svg" />
              </a>
            </div>
            <div className="card-icon-container rounded-full w-[40px] h-[40px]">
              <a
                href={`${data.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-icon border-2 rounded-full w-full h-full flex justify-center items-center group  "
              >
                <FontAwesomeIcon icon={faInstagram} className="card-icon-svg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignersCard;
