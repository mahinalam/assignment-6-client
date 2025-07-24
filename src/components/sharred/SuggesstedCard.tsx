import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';

const SuggesstedCard = ({ title }: { title: string }) => {
  return (
    <div className="flex text-lg gap-4 w-[80%] my-2">
      <span>
        <FaChevronRight className="text-border mt-1" />
      </span>
      <p className=" hover:text-border ">{title}</p>
    </div>
  );
};

export default SuggesstedCard;
