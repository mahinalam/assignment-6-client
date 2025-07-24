import { useMutation, useQuery } from '@tanstack/react-query';
import { IBlog } from '../types';
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from '../services/BlogService';

export const useCreateBlog = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ['BLOG'],
    mutationFn: async (blogData) => await createBlog(blogData),
  });
};
export const useDeleteBlog = () => {
  return useMutation<any, Error, any>({
    mutationKey: ['BLOG'],
    mutationFn: async (id: string) => await deleteBlog(id),
  });
};

export const useUpdateBlog = () => {
  return useMutation<any, Error, any>({
    mutationKey: ['BLOG'],
    mutationFn: async (data: Partial<IBlog>) => await updateBlog(data),
  });
};

export const useGetAllBlogs = (params: { [key: string]: any }) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value)
  );

  return useQuery({
    queryKey: ['BLOG', cleanedParams],
    queryFn: () => getAllBlogs(cleanedParams),
  });
};

export const useGetSingleBlog = (blogId: string) => {
  return useQuery({
    queryKey: ['BLOG'],
    queryFn: async () => await getSingleBlog(blogId),
  });
};
