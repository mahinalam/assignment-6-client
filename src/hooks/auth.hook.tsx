/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable padding-line-between-statements */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  createTopGardener,
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUserStats,
  loginUser,
  registerUser,
  removeTopGardener,
  updateMyProfile,
  verifyProfile,
} from "../services/AuthService";

export const useUserRegistration = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["USER"],
    mutationFn: async (formData) => await registerUser(formData),
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER"],
    mutationFn: async (userData) => await loginUser(userData),
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

export const useVerifyUserProfile = (userId: string) => {
  // const queryClient = useQueryClient();
  return useMutation<any, Error>({
    mutationKey: ["USER", userId, "PAYMENT"],
    mutationFn: async () => await verifyProfile(),
    onSuccess: (data) => {
      window.location.href = data.data.payment_url;
    },
    onError: (error) => {
      toast.error("Verification failed:");
    },
  });
};

export const useUpdateMyProfile = (userId: string) => {
  // const queryClient = useQueryClient();
  return useMutation<any, Error, FormData>({
    mutationKey: ["USER", userId],
    mutationFn: async (formData) => await updateMyProfile(formData),
  });
};

export const useGetSingleUser = (userId: string) => {
  return useQuery({
    queryKey: ["USER", userId],
    queryFn: async () => await getSingleUser(userId),
    enabled: !!userId,
  });
};

export const useGetAllUsers = (params: { [key: string]: any }) => {
  return useQuery({
    queryKey: ["USER", params],
    queryFn: async () => await getAllUsers(params),
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

// create top gardener
export const useCreateTopGardener = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["USER"],
    mutationFn: async (payload: { user: string }) =>
      await createTopGardener(payload),
  });
};
// remove top gardener
export const useRemoveTopGardener = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["USER"],
    mutationFn: async (userId: string) => await removeTopGardener(userId),
  });
};

export const useGetUserStats = () => {
  return useQuery({
    queryKey: ["USER"],
    queryFn: async () => await getUserStats(),
  });
};
