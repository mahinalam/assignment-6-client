/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable padding-line-between-statements */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  registerUser,
  updateMyProfile,
  verifyProfile,
} from "../services/AuthService";

export const useUserRegistration = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["USER"],
    mutationFn: async (formData) => await registerUser(formData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User login successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUserUpdateProfile = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User login successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useVerifyUserProfile = () => {
  // const queryClient = useQueryClient();
  return useMutation<any, Error>({
    mutationKey: ["USER"],
    mutationFn: async () => await verifyProfile(),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["USER"] });
    //   toast.success(
    //     "Payment Successful! Your transaction has been completed successfully. Thank you for your payment"
    //   );
    // },
    // onError: (error) => {
    //   toast.error(error.message);
    // },
  });
};

export const useUpdateMyProfile = () => {
  // const queryClient = useQueryClient();
  return useMutation<any, Error, FormData>({
    mutationKey: ["USER"],
    mutationFn: async (formData) => await updateMyProfile(formData),
  });
};

export const useGetSingleUser = (id: string) => {
  return useQuery({
    queryKey: ["USER"],
    queryFn: async () => await getSingleUser(id),
    enabled: !!id,
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["USER"],
    queryFn: async () => await getAllUsers(),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationKey: ["USER"],
    mutationFn: async (userId) => await deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["USER"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
