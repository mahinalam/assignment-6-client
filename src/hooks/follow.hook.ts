import { useMutation, useQuery } from '@tanstack/react-query';
import {
  followUser,
  getFollowersAndFollwingUser,
  removeFollower,
  unFollowUser,
} from '../services/FollweService';

// follow user
export const useFollowUser = (followerId: string, followingId: string) => {
  return useMutation<any, Error, any>({
    mutationKey: ['FOLLOW'],
    mutationFn: async (commentData) => await followUser(commentData),
  });
};

// unfollow user
export const useUnFollowUser = () => {
  return useMutation<any, Error, any>({
    mutationKey: ['FOLLOW'],
    mutationFn: async (commentData) => await unFollowUser(commentData),
  });
};

// remove follower
export const useRemoveFollower = () => {
  return useMutation<any, Error, any>({
    mutationFn: async (followerId) => await removeFollower(followerId),
    mutationKey: ['FOLLOW'],
  });
};

// get follower and following user
export const useGetFollwersAndFollwingUser = (userId: string) => {
  return useQuery({
    queryKey: ['FOLLOW'],
    queryFn: async () => await getFollowersAndFollwingUser(userId),
    enabled: !!userId,
  });
};
