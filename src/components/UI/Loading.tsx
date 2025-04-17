import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = ({ isAlign = false }) => {
  return (
    <div
      className={`flex flex-row h-[90vh] w-full  justify-center ${!isAlign ? "items-center" : ""} `}
    >
      <div>
        <ScaleLoader className="w-full h-full" color="green" />
      </div>
    </div>
  );
};

export default Loading;
