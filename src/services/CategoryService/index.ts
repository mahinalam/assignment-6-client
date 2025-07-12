"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      cache: "no-store",
    });

    const data = res.json();

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
