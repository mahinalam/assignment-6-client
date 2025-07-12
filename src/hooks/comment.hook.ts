import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createComment,
  deleteComment,
  getAllComments,
} from "../services/CommentService";

export const useCreateComment = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["COMMENTS"],
    mutationFn: async (commentData) => await createComment(commentData),
  });
};

// delete comment
export const useDeleteComment = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["COMMENTS"],
    mutationFn: async (commentId: string) => await deleteComment(commentId),
  });
};

export const useGetAllComments = (params?: {
  post?: string;
  user?: string;
}) => {
  return useQuery({
    queryKey: ["COMMENTS"],
    queryFn: async () => await getAllComments(params),
  });
};
