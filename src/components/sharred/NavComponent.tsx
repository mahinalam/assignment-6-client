"use client";

import Link from "next/link";
import React from "react";

interface IProps {
  title: string;
  icon: React.ElementType; // 👈 Accepts component type
  address?: string;
  activeTab: boolean;
  onClick: (params: string) => void;
}

const NavComponent = ({
  title,
  icon: Icon,
  address = "#",
  activeTab,
  onClick,
}: IProps) => {
  return (
    <Link href={address} passHref>
      <div
        onClick={() => onClick(title)}
        className={`
          flex items-center gap-3 px-4 py-4 cursor-pointer transition-all duration-150
          rounded-lg
          ${activeTab ? "font-bold  text-black" : "text-gray-700"}
          hover:bg-gray-100 hover:text-black
        `}
      >
        <Icon
          size={28}
          className={`${
            activeTab ? "fill-current text-black font-bold" : "text-gray-500"
          }`}
        />
        <span className="text-sm">{title}</span>
      </div>
    </Link>
  );
};

export default NavComponent;
