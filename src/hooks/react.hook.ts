import { useMutation, useQuery } from '@tanstack/react-query';
import { createReact, getPostReacts } from '../services/ReactService';

export const useCreateReact = (postId: string) => {
  return useMutation<any, Error, any>({
    mutationKey: ['REACT', postId],
    mutationFn: async (payload) => await createReact(payload),
    // },
  });
};

export const useGetPostReacts = (postId: string) => {
  return useQuery({
    queryKey: ['REACT', postId],
    queryFn: async () => await getPostReacts(postId),
    enabled: !!postId,
  });
};
