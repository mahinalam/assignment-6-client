import { useMutation, useQuery } from '@tanstack/react-query';

import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from '../services/CategoryService';

export const useGetAllCategories = (params?: { [key: string]: any }) => {
  return useQuery({
    queryKey: ['CATEGORY', params],
    queryFn: async () => await getAllCategories(params),
  });
};

// create category
export const useCreateCategory = () => {
  return useMutation<any, Error, any>({
    mutationKey: ['CATEGORY'],
    mutationFn: async (categoryInfo) => await createCategory(categoryInfo),
  });
};

export const useDeleteCategory = () => {
  return useMutation<any, Error, any>({
    mutationKey: ['CATEGORY'],
    mutationFn: async (categoryId) => await deleteCategory(categoryId),
  });
};
