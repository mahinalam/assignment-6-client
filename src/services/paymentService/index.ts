'use server';

import axiosInstance from '@/src/lib/AxiosInstance';

// export const getAllPayments = async () => {
//   try {
//     const { data } = await axiosInstance.get("/payment");
//     return data;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };
// services/payment.service.ts
export const getAllPayments = async (params?: { [key: string]: any }) => {
  const searchParams = new URLSearchParams(params).toString();
  try {
    const { data } = await axiosInstance.get(`/payment?${searchParams}`);
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

// check is user verified
export const isUserVerified = async () => {
  try {
    const { data } = await axiosInstance.get('/payment/isVerified');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deletePayment = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/payment/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
