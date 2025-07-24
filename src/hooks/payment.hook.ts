import { useMutation, useQuery } from '@tanstack/react-query';

import { createComment } from '../services/CommentService';
import {
  deletePayment,
  getAllPayments,
  isUserVerified,
} from '../services/paymentService';

export const useCreateComment = () => {
  return useMutation<any, Error, any>({
    mutationKey: ['COMMENTS'],
    mutationFn: async (commentData) => await createComment(commentData),
  });
};
export const useDeletePayment = () => {
  return useMutation<any, Error, any>({
    mutationKey: ['PAYMENT'],
    mutationFn: async (paymentId) => await deletePayment(paymentId),
  });
};

// export const useGetAllPayments = () => {
//   return useQuery({
//     queryKey: ["PAYMENT"],
//     queryFn: async () => await getAllPayments(),
//   });
// };
// hooks/payment.hook.ts

export const useGetAllPayments = (params?: { [key: string]: any }) => {
  return useQuery({
    queryKey: ['PAYMENT', params], // important for caching and refetching
    queryFn: async () => await getAllPayments(params),
  });
};

// check is user verified
export const useIsUserVerified = () => {
  return useQuery({
    queryKey: ['PAYMENT'],
    queryFn: async () => {
      return await isUserVerified();
    },
  });
};
