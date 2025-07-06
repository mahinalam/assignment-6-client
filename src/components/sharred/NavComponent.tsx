"use client";

import Link from "next/link";
import React from "react";

interface IProps {
  title: string;
  icon: any;
  address?: string;
}

const NavComponent = ({ title, icon, address }: IProps) => {
  return (
    <Link href={address as string} className="flex gap-3 items-center py-3">
      <span>{icon}</span>
      <span>{title}</span>
    </Link>
  );
};

export default NavComponent;
