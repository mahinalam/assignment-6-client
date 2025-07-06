import React from "react";

const SuggesstedCard = () => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <img
          alt=""
          className="size-[40px] rounded-full mr-2"
          //   src={user?.profilePhoto}
        />
      </div>
      <div>
        <p className="text-sm ">Mahin</p>
      </div>
      <div>
        <span className="text-sm lg:pl-16 text-primary">Follow</span>
      </div>
    </div>
  );
};

export default SuggesstedCard;
