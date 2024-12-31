import React, { useRef, useEffect, useState } from "react";
import { ImgComparisonSlider } from "@img-comparison-slider/react";
import { useTranslation } from "react-i18next";

const BeforeAfterSlider = (props) => {
  const { t, i18n } = useTranslation();
  const hoverRef = useRef(null);
  const [mouseMoveX, setMouseMoveX] = useState(1);
  const halfScreenWidth = window.innerWidth / 2;

  useEffect(() => {
    const hoverElement = hoverRef.current;

    const handleMouseMove = (e) => {
      // console.log(`Mouse X: ${e.clientX} ${halfScreenWidth}`); // Logs the X-coordinate of the mouse
      setMouseMoveX(halfScreenWidth - e.clientX);
      // document.querySelectorAll('.hero-text')?.forEach((el) => {
      //   el.style
      // })
    };

    if (hoverElement) {
      hoverElement.addEventListener("mousemove", handleMouseMove);

      // Access the shadow DOM after component mounts
      const shadowRoot = hoverElement.shadowRoot;
      if (shadowRoot) {
        // Select the `.second` image inside the shadow DOM
        const secondImage = shadowRoot.querySelector(".second");
        if (secondImage) {
          // You can now manipulate the `.second` image
          secondImage.style.height = "100%"; // Example: Set height to 100%
        }
      }
    }

    // Cleanup the event listener
    return () => {
      if (hoverElement) {
        hoverElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mouseMoveX]);
  console.log(props.data);
  return (
    <div className="w-screen">
      {props.data && (
        <ImgComparisonSlider
          className="catch-divider h-full w-screen relative"
          ref={hoverRef}
          nonce="hight: 100%"
        >
          <img
            className="h-full w-full object-cover"
            slot="first"
            src={props.data.image[0]}
            alt="Before"
            style={{ height: "100%" }}
          />
          <img
            className="h-full w-full object-cover"
            slot="second"
            src={props.data.image[1]}
            alt="After"
            style={{ height: "100%" }}
          />
          <h1
            className="w-[605] hero-text text-center text-2xl lg:text-7xl text-black absolute px-2 pb-[4px] "
            style={{
              top: "50%",
              left: `${50 + mouseMoveX * 0.005}%`,
              transform: "translate(-50%, -50%)",
            }}
            slot="first"
          >
            {props.data.text[i18n.language]}
          </h1>
          <h1
            className="w-[605] hero-text hero-text-2 text-center text-2xl lg:text-7xl text-white absolute px-2 pb-[4px]"
            style={{
              top: "50%",
              left: `${50 + mouseMoveX * 0.005}%`,
              transform: "translate(-50%, -50%)",
            }}
            slot="second"
          >
            {props.data.text[i18n.language]}
          </h1>
        </ImgComparisonSlider>
      )}
    </div>
  );
};

export default BeforeAfterSlider;
