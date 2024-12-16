import React, { useRef, useEffect, useState } from "react";
import { ImgComparisonSlider } from "@img-comparison-slider/react";

const BeforeAfterSlider = (props) => {
  const hoverRef = useRef(null);
  const [mouseMoveX, setMouseMoveX] = useState(1)
  const halfScreenWidth = window.innerWidth / 2

    useEffect(() => {
        const hoverElement = hoverRef.current;

        const handleMouseMove = (e) => {
            // console.log(`Mouse X: ${e.clientX} ${halfScreenWidth}`); // Logs the X-coordinate of the mouse
            setMouseMoveX((halfScreenWidth - e.clientX))
            // document.querySelectorAll('.hero-text')?.forEach((el) => {
            //   el.style
            // })
          };

        if (hoverElement) {
            hoverElement.addEventListener('mousemove', handleMouseMove);
        }

        // Cleanup the event listener
        return () => {
            if (hoverElement) {
                hoverElement.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [mouseMoveX]);

  return (
    <ImgComparisonSlider
      className="catch-divider h-[calc(100vh-72px)] w-full relative"
      ref={hoverRef}
    >
      <img
        className="h-[calc(100vh-72px)] w-full object-cover"
        slot="first"
        src={props.beforeImage}
        alt="Before"
      />
      <img
        className="h-[calc(100vh-72px)] w-full object-cover"
        slot="second"
        src={props.afterImage}
        alt="After"
      />
      <h1
        className="hero-text text-center text-7xl text-black absolute px-2 pb-[4px]"
        style={{
          top: "50%",
          left: `${50 + (mouseMoveX * 0.005)}%`,
          transform: "translate(-50%, -50%)",
        }}
        slot="first"
      >
        DESIGN LAB
      </h1>
      <h1
        className="hero-text hero-text-2 text-center text-7xl text-white absolute px-2 pb-[4px]"
        style={{
          top: "50%",
          left: `${50 + (mouseMoveX * 0.005)}%`,
          transform: "translate(-50%, -50%)",
        }}
        slot="second"
      >
        DESIGN LAB
      </h1>
    </ImgComparisonSlider>
  );
};

export default BeforeAfterSlider;
