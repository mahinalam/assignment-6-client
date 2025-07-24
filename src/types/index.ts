import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  mobileNumber: string;
  profilePhoto: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  isDeleted?: boolean;
  isVerified?: boolean;
  isTopGardener?: boolean;
}

export interface IPost {
  _id: string;
  title: string;
  content: string;
  images: string[];
  isDeleted: boolean;
  isPremium: boolean;
  status: 'draft' | 'published' | 'pending' | 'rejected'; // extend if needed
  favoriteCount: number;
  comments: string[]; // comment IDs
  category: ICategory;
  user: IUser;

  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IInput {
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  type?: string;
  label?: string;
  name: string;
  disabled?: boolean;
  id?: string;
  placeholder?: string;
  defaultValue?: string;
  readonly?: boolean;
  endContent?: any;
}

export interface ICategory {
  _id: string;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IBlog {
  _id: string;
  author: any;
  category: any;
  title: string;
  content: string;
  images: string[];
  status: 'pending' | 'approved' | 'rejected';
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IWishlistItem {
  _id: string;
  isDeleted: boolean;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date
  user: IUser;
  post: IPost;
  __v: number;
}

export interface IPayment {
  _id: string;
  transactionId: string;
  totalPrice: number;
  userId: IUser;
  currency: string;
  paymentStatus: 'paid' | 'unpaid' | 'pending'; // You can adjust based on your enum
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
