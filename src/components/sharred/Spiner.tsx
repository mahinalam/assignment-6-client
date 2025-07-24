'use client';

import { ClipLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="flex justify-end items-center h-full w-full">
      <ClipLoader
        color="secondary" // Instagram's pink color
        loading={true}
        size={20} // Smaller size
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
