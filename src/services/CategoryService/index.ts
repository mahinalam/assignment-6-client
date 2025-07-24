'use server';

import axiosInstance from '@/src/lib/AxiosInstance';

export const getAllCategories = async (params?: { [key: string]: any }) => {
  const searchParams = new URLSearchParams(params).toString();
  try {
    const { data } = await axiosInstance.get(`/category?${searchParams}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createCategory = async (
  categoryInfo: Record<string, unknown>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/category', categoryInfo);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteCategory = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/category/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
