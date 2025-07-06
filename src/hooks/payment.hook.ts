import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deletePayment,
  getAllPayments,
  getAllUserPayments,
  isUserVerified,
} from "../services/paymentService";

export const useGetAllPayments = (params?: { userId?: string }) => {
  return useQuery({
    queryKey: ["PAYMENT", params?.userId],
    queryFn: async () => {
      // Conditionally call getAllPayments with or without params
      if (params && params.userId) {
        return await getAllPayments(params); // Call with params if provided
      }

      return await getAllPayments(); // Call without params if not provided
    },
    // enabled: !!params?.userId,
  });
};

// get user's payment
export const useGetAllUserPayments = (userId: string) => {
  return useQuery({
    queryKey: ["PAYMENT", userId],
    queryFn: async () => {
      return await getAllUserPayments(userId);
    },
    enabled: !!userId,
  });
};

// check is user verified
export const useIsUserVerified = () => {
  return useQuery({
    queryKey: ["PAYMENT"],
    queryFn: async () => {
      return await isUserVerified();
    },
  });
};

// delete payment
export const useDeletePayment = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["PAYMENT"],
    mutationFn: async (id: string) => await deletePayment(id),
  });
};
