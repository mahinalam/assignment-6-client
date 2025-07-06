import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IPost {
  _id: string;
  title: string;
  content: string;
  images: string[];
  isDeleted: boolean;
  isPremium: boolean;
  status: "draft" | "published" | "pending" | "rejected"; // extend if needed
  favoriteCount: number;
  comments: string[]; // comment IDs
  category: {
    _id: string;
    name: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    _id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN" | string;
    followers: string[];
    following: string[];
    profilePhoto?: string;
  };

  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label?: string;
  name: string;
  disabled?: boolean;
  id?: string;
  placeholder?: string;
  defaultValue?: string;
  readonly?: boolean;
}

export interface ICategory {
  _id: string;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
