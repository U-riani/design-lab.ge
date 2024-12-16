import React from "react";

const SpaceComponent = ({ data = {data: "TITLE"} }) => {
  // console.log(data);
  return (
    <div className="space-component bg-[#f8fafc] relative flex justify-center overflow-hidden pt-[90px]">
      <div className="space-component-arrow h-[400px] w-[400px] bg-[#fff] rotate-45 absolute top-2/4 right-[-200px] translate-y-[-50%] z-0"></div>
      <div className="space-component-inner  border-r-[10px] border-[#886d37] flex flex-col items-end z-10 pr-5">
        <h2 className="w-fit text-8xl">{data.data}</h2>
        <h4 className="w-fit text-4xl">{data.data}</h4>
      </div>
    </div>
  );
};

export default SpaceComponent;
