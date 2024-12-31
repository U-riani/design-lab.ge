import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
// import { faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";


const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handelScroll = () => {
    if (window.scrollY > 71) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handelScroll);
    return () => window.removeEventListener("scroll", handelScroll);
  });

  return (
    <div className="scrollUp-container fixed bottom-0 right-0 mr-2 mb-2">
      <FontAwesomeIcon onClick={scrollTop} icon={faAnglesUp} className={`scrollUp-icon ${isVisible ? 'opacity-100 cursor-pointer': 'opacity-0'} transition duration-200`} size="2x" />
      {/* <FontAwesomeIcon onClick={scrollTop} icon={faSquareCaretUp} className={`scrollUp-icon scrollUp-2 ${isVisible ? 'visible-scrollUp': ''}`} size="2x" /> */}
    </div>
  );
};

export default ScrollUp;
