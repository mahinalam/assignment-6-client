"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import axiosInstance from "@/src/lib/AxiosInstance";


export const getSingleUser = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get(`/users`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const registerUser = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
      userData
    );

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const verifyProfile = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/verify-profile");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const followUser = async (
  userIds: Record<string, unknown>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.put("/users/follow-users", userIds);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// unfollw user
export const unFollowUser = async (
  userIds: Record<string, unknown>
): Promise<any> => {
  console.log("userIds", userIds);
  try {
    const { data } = await axiosInstance.put("/users/unfollow-users", userIds);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const checkFollower = async (ids: Record<string, unknown>) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/users/check-follower",
      ids
    );

    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export const deleteUser = async (userId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/users/${userId}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      mobileNumber: decodedToken.mobileNumber,
      role: decodedToken.role,
      status: decodedToken.status,
      profilePhoto: decodedToken.profilePhoto,
    };
  }

  return decodedToken;
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error("Failed to get new access token");
  }
};

export const updateMyProfile = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `${process.env.NEXT_PUBLIC_BASE_API}/profile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const sendMessage = async (contactInfo: Record<string, unknown>) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API}/contact/send-message`,
      contactInfo
    );



    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
