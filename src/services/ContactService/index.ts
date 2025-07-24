'use server';

import axiosInstance from '@/src/lib/AxiosInstance';

export const sendMessage = async (
  message: Record<string, unknown>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/contact', message);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
