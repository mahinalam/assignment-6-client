"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

// export const createPost = async (formData: FormData): Promise<any> => {
//   try {
//     const { data } = await axiosInstance.post("/gardening-posts", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     // revalidateTag("posts");

//     return data;
//   } catch (error: any) {
//     console.log(error.message);
//     throw new Error(error.message);
//   }
// };

export const deletePayment = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/payment/${id}`);

    return data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getAllPayments = async (query?: { userId?: string }) => {
  try {
    let endpoint = "/payment/get-all-payments";
    if (query?.userId) {
      endpoint += `?userId=${query.userId}`;
    }
    const { data } = await axiosInstance.get(endpoint);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// get user payments
export const getAllUserPayments = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/payment/get-all-payments?userId=${userId}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSingleGardeningPost = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/gardening-posts/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
// check is user verified
export const isUserVerified = async () => {
  try {
    const { data } = await axiosInstance.get(`/payment/isVerified`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
