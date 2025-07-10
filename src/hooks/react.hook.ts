import { useMutation, useQuery } from "@tanstack/react-query";
import { createReact, getPostReacts } from "../services/ReactService";

export const useCreateReact = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["REACT"],
    mutationFn: async (payload) => await createReact(payload),
    // },
  });
};

export const useGetPostReacts = (postId: string) => {
  return useQuery({
    queryKey: ["REACT", postId],
    queryFn: async () => await getPostReacts(postId),
    enabled: !!postId,
  });
};
