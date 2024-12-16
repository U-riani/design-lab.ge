import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMapLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const FooterComponent = () => {
  return (
    <div
      className="footer w-full py-[20px] flex justify-center"
    >
      <div className="footer-inner flex flex-col justify-center items-center gap-y-[20px]">
        <div className="footer-follow-us flex flex-col gap-y-[10px] ">
          <h3 className="text-center font-bold text-[22px]">FOLLOW US</h3>
          <ul className="footer-icons-container flex flex-row justify-center gap-x-[30px]">
            <li className="group">
              <a
                href="https://www.facebook.com/designlab2022"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-[50px] h-[50px] bg-[#f5f5f4] rounded-full"
              >
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="icon-size group-hover:text-white transition duration-300"
                  size="2x"
                />
              </a>
            </li>
            <li className="group">
              <a
                href="https://www.facebook.com/designlab2022"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-[50px] h-[50px] bg-[#f5f5f4] rounded-full"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="icon-size group-hover:text-white transition duration-300"
                  size="2x"
                />
              </a>
            </li>
            <li className="group">
              <a
                href="https://www.facebook.com/designlab2022"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-[50px] h-[50px] bg-[#f5f5f4] rounded-full"
              >
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="icon-size group-hover:text-white transition duration-300"
                  size="2x"
                />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-info-container w-full">
          <ul className="flex flex-col lg:flex-row justify-evenly items-center gap-y-[15px] lg:gap-x-[30px]">
            <li className="bg-[#f5f5f4] rounded-lg order-1 lg:order-1">
              <a
                target="_blank"
                href="mailto:info@design-lab.ge?subject=Inquiry&body=Hello,%20I%20would%20like%20to%20learn%20more%20about%20your%20services."
                className="block w-full h-full px-3 py-2"
              >
                {" "}
                <FontAwesomeIcon className="pr-[10px]" icon={faEnvelope} />{" "}
                info@design-lab.ge
              </a>
            </li>
            <li className="bg-[#f5f5f4] px-3 py-2 rounded-lg order-3 lg:order-2">
              {" "}
              <FontAwesomeIcon
                className="pr-[10px]"
                icon={faMapLocationDot}
              />{" "}
              Tbilisi, Georgia Ana Politkovskaia St 3/28
            </li>
            <li className="bg-[#f5f5f4] rounded-lg order-2 lg:order-3">
              <a
                target="_blank"
                href="https://wa.me/995599640641?text=Hello%20there!"
                className="block w-full h-full px-3 py-2"
              >
                {" "}
                <FontAwesomeIcon className="pr-[10px]" icon={faPhone} /> +995
                599 64 06 41
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-created flex justify-center">
          <p>
            Created By © <span className="font-bold">DESIGN-LAB.GE</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
