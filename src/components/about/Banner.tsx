import React from 'react';

const Banner = () => {
  return (
    <div
      className="relative  md:h-[60vh] h-[50vh] bg-cover bg-center bg-no-repeat
     overflow-hidden"
      style={{
        backgroundImage:
          'url(\'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz0XciPxu38BNsmzP0nyqlnDnq7IUosdjH3w&s\')',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute top-0  left-0 w-full h-full bg-gradient-to-r from-black/40 to-black-20 pointer-events-none" />

      {/* Text content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col gap-5">
          <h1 className="md:text-5xl text-4xl text-white opacity-90 font-bold">
            What is Green Haven?
          </h1>

          <h1 className="md:text-3xl text-xl text-white opacity-90 font-bold">
            Haven Gardening Advice for Haven Gardeners!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
