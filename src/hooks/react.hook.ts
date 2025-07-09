import { useMutation, useQuery } from "@tanstack/react-query";

import { createComment, getAllComments } from "../services/CommentService";

export const useCreateComment = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["COMMENTS"],
    mutationFn: async (commentData) => await createComment(commentData),
    // onSuccess: () => {
    //   toast.success("Post created successfully");
    // },
    // onError: (error) => {
    //   toast.error(error.message);
    // },
  });
};

// export const useUpdatePost = () => {
//   return useMutation<any, Error, any>({
//     mutationKey: ["POST"],
//     mutationFn: async (data) => await updatePost(data),
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });
// };

export const useGetAllComments = (params?: {
  post?: string;
  user?: string;
}) => {
  return useQuery({
    queryKey: ["COMMENTS"],
    queryFn: async () => await getAllComments(params),
  });
};
