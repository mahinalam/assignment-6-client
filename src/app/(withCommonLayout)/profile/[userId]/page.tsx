/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'; // Modal-related imports

import { useGetSingleUser, useVerifyUserProfile } from '@/src/hooks/auth.hook';
import { useGetAllPosts, useGetUserSavedPosts } from '@/src/hooks/post.hook';
import { useUser } from '@/src/context/user.provider';
import Container from '@/src/components/Container';
import FollowerCard from '@/src/components/profile/FolowerCard';
import Loading from '@/src/components/UI/Loading';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import PostImageCard from './PostImageCard';
import { useGetPostReacts } from '@/src/hooks/react.hook';
import ProfileSkeleton from './Loading';
import {
  useFollowUser,
  useGetFollwersAndFollwingUser,
  useRemoveFollower,
  useUnFollowUser,
} from '@/src/hooks/follow.hook';
import PaginationHelper from '@/src/components/sharred/paginationHelper';
import { IoIosArrowDown } from 'react-icons/io';
import DeleteModal from '@/src/components/modal/DeleteModal';
import VerificationModal from '@/src/components/modal/VerificationModal';

const ProfilePage = ({ params }: { params: { userId: string } }) => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const limit = 6;
  const [savedPostPage, setSavedPostPage] = useState(1);
  const savedPostLimit = 6;
  const router = useRouter();

  const { user: curentUserInfo } = useUser();

  const { data: savedPosts, isLoading: savedPOstLoading } =
    useGetUserSavedPosts({
      user: curentUserInfo?._id,
      page: savedPostPage,
      limit: savedPostLimit,
    });

  const { data: userPostInfo, isLoading: userPostInfoLoading } = useGetAllPosts(
    {
      user: params.userId,
      page,
      limit,
    }
  );
  const { data: currentUserData, isLoading: currentUserDataLoading } =
    useGetSingleUser(params?.userId);
  const { data: followersAndFollowingUserData, isLoading: followerLoading } =
    useGetFollwersAndFollwingUser(params?.userId as string);

  const [removeFollowerId, setRemoveFollowerId] = useState('');
  const [unFollowUserId, setUnFollowUserId] = useState('');
  const [followingUserId, setFollowingUserId] = useState('');
  const [unFollowFollowingUser, setUnFollowFollowingUser] = useState({
    _id: '',
    name: '',
  });
  const {
    mutate: verifyProfile,
    isSuccess,
    isError,
  } = useVerifyUserProfile(params?.userId);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const { mutate: followUser, isSuccess: followUserSuccess } = useFollowUser(
    curentUserInfo?._id as string,
    followingUserId
  );
  const { mutate: removeFollower } = useRemoveFollower();
  // removeFollowerId,
  // curentUserInfo?._id as string
  const { mutate: unFollowUser } = useUnFollowUser();
  const {
    isOpen: isUnFollowModalOpen,
    onOpen: onUnFollowmodalOpen,
    onOpenChange: onUnFollowModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isUnFollowFollowingModalOpen,
    onOpen: onUnFollowFollowingModalOpen,
    onOpenChange: onUnfollowFollowingModalOPenChange,
  } = useDisclosure();

  const {
    isOpen: isFollowerModalOpen,
    onOpen: onFollowerModalOpen,
    onClose: onFollowerModalClose,
  } = useDisclosure();

  const {
    isOpen: isFollowingModalOpen,
    onOpen: onFollowingModalOpen,
    onClose: onFollowingModalClose,
  } = useDisclosure();

  const {
    isOpen: isVerificationModalOpen,
    onOpen: onVerifyModalOpen,
    onOpenChange: onVerifyModalOpenChange,
  } = useDisclosure();

  const posts = userPostInfo?.data;

  if (currentUserDataLoading) {
    return <ProfileSkeleton />;
  }
  const totalProducts = userPostInfo?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  // saved posts
  const totalSavedPosts = savedPosts?.data?.meta?.total || 0;
  const totalSavedPostPages = Math.ceil(totalSavedPosts / limit);

  const isFollower = followersAndFollowingUserData?.data?.followers?.filter(
    (user: any) => curentUserInfo?._id === user?.follower?._id
  );

  const isOwnProfile = params.userId === curentUserInfo?._id;
  // follow user
  const handleFollowUser = async (followingUserId: string) => {
    setFollowingUserId(followingUserId);
    if (followingUserId) {
      await followUser(
        { followingUserId: followingUserId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({});
          },
        }
      );
    }
  };

  // unfollow user
  const handleUnFollowUser = async () => {
    if (unFollowUserId) {
      const res = await unFollowUser(
        { followingUserId: unFollowUserId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              // queryKey: ["FOLLOW", curentUserInfo?._id, unFollowUserId],
              queryKey: ['FOLLOW'],
            });
          },
        }
      );
    }
  };
  // unfollow following user
  const handleUnfollowFollowingUser = async () => {
    // if (unFollowFollowingUser?._id) {
    const res = await unFollowUser(
      { followingUserId: unFollowFollowingUser?._id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['FOLLOW'],
          });
        },
      }
    );
    // }
  };

  // remove follower
  const handleRemoveFollower = async (followerId: string) => {
    if (followerId) {
      const res = await removeFollower(
        { followerUserId: followerId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['FOLLOW'] });
          },
        }
      );
    }
  };

  // verify profile
  const handleVerifyProfile = async () => {
    setVerifyLoading(true);
    await verifyProfile();
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['USER', params.userId, 'PAYMENT'],
      });
      setVerifyLoading(false);
      onVerifyModalOpenChange();
    }
    if (isError) {
      setVerifyLoading(false);
    }
  };

  // unfollow modal

  const handleUnFollowModalOpen = (unFollowUserId: string) => {
    onUnFollowmodalOpen();
    setUnFollowUserId(unFollowUserId);
  };

  // follower modal open
  const handleFollowerModalOpen = () => {
    if (!isOwnProfile) {
      return null;
    }
    onFollowerModalOpen();
  };

  // following modal open
  const handleFollowingModalOpen = () => {
    if (!isOwnProfile) {
      return null;
    }
    onFollowingModalOpen();
  };

  // following modal open
  const handleUnfollowFollowingUserModalOpen = (_id: string, name: string) => {
    setUnFollowFollowingUser({ _id, name });
    onUnFollowFollowingModalOpen();
  };

  return (
    <div className="lg:w-[70%] w-full mx-auto mt-[64px] lg:mt-0">
      <div className="flex flex-col md:flex-row md:items-start md:gap-10 items-center">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={currentUserData?.data?.profilePhoto}
            alt="Profile"
            className="w-24 h-24 md:w-36 md:h-36 rounded-full object-cover"
          />
        </div>

        {/* Name, Stats, Actions */}
        <div className="flex-1 mt-4 md:mt-0 w-full">
          {/* Name and Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h2 className="text-lg font-bold">
                {currentUserData?.data?.name}
              </h2>
              {currentUserData?.data?.isVerified && (
                <svg
                  className="w-5 h-5"
                  fill="#1DA1F2"
                  stroke="white"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" fill="#1DA1F2" r="10" />
                  <path
                    d="M9 12.75 11.25 15 15 9.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-2 md:mt-0 flex justify-center md:justify-start gap-2">
              {!isOwnProfile ? (
                Array.isArray(isFollower) && isFollower.length > 0 ? (
                  <Button
                    className={
                      curentUserInfo?.role === 'ADMIN' ? 'hidden' : 'block'
                    }
                    size="sm"
                    onClick={() =>
                      handleUnFollowModalOpen(currentUserData?.data?._id)
                    }
                  >
                    <span className="flex gap-2 items-center">
                      <span>Following</span>
                      <span>
                        <IoIosArrowDown size={15} />
                      </span>
                    </span>
                  </Button>
                ) : (
                  <Button
                    className={
                      curentUserInfo?.role === 'ADMIN' ? 'hidden' : 'block'
                    }
                    size="sm"
                    onClick={() => handleFollowUser(params?.userId)}
                  >
                    Follow
                  </Button>
                )
              ) : (
                <>
                  <Button
                    size="sm"
                    onClick={() => router.push('/profile/edit-profile')}
                  >
                    Edit Profile
                  </Button>
                  {!curentUserInfo?.isVerified && (
                    <Button
                      className={` ${
                        curentUserInfo?.role === 'ADMIN'
                          ? 'hidden'
                          : 'hidden lg:block'
                      }`}
                      size="sm"
                      onClick={onVerifyModalOpen}
                    >
                      Verify
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Stats: posts, followers, following */}
          {curentUserInfo?.role === 'USER' && (
            <div className="flex justify-center md:justify-start gap-8 mt-4">
              <div>
                <span className="font-bold">{posts?.data?.length}</span> posts
              </div>
              <div
                className={`${isOwnProfile ? 'cursor-pointer' : ''}`}
                onClick={handleFollowerModalOpen}
              >
                <span className="font-bold">
                  {followersAndFollowingUserData?.data?.followers?.length || 0}{' '}
                </span>
                followers
              </div>
              <div
                className={`${isOwnProfile ? 'cursor-pointer' : ''}`}
                onClick={handleFollowingModalOpen}
              >
                <span className="font-bold">
                  {followersAndFollowingUserData?.data?.followingUser?.length ||
                    0}{' '}
                </span>
                following
              </div>
            </div>
          )}

          {/* Email or Bio */}
          <div className="mt-4 text-center md:text-left">
            <p className="text-sm text-gray-600">
              {currentUserData?.data?.email}
            </p>
          </div>
        </div>
      </div>
      {/* Marked: Modal ends */}
      <div>
        {curentUserInfo?.role === 'USER' && (
          <div className="flex w-full mt-6 lg:mt-8 flex-col">
            <Tabs aria-label="Options" variant="solid">
              <Tab key="posts" title="POSTS">
                <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-5">
                  {userPostInfo?.data?.data?.length > 0 ? (
                    userPostInfo?.data?.data?.map(
                      (item: any, index: number) => (
                        <PostImageCard
                          key={index}
                          image={item.images[0]}
                          id={item._id}
                        />
                      )
                    )
                  ) : (
                    <p>You don't have any post yet.</p>
                  )}
                </div>
                <PaginationHelper
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              </Tab>
              {isOwnProfile && (
                <Tab key="saved" title="SAVED">
                  <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-5">
                    {savedPosts?.data?.data?.length > 0 ? (
                      savedPosts?.data?.data?.map(
                        (item: any, index: number) => (
                          <PostImageCard
                            key={index}
                            image={item.post?.images[0]}
                            id={item?.post?._id}
                          />
                        )
                      )
                    ) : (
                      <p>You don't have any saved post yet.</p>
                    )}
                  </div>
                  <PaginationHelper
                    page={savedPostPage}
                    setPage={setPage}
                    totalPages={totalSavedPostPages}
                  />
                </Tab>
              )}
            </Tabs>
          </div>
        )}
      </div>
      <Modal
        isOpen={isFollowerModalOpen}
        scrollBehavior="inside"
        size="md"
        onClose={onFollowerModalClose}
      >
        {' '}
        {/* Marked: Modal starts */}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Followers
              </ModalHeader>
              <ModalBody>
                {followersAndFollowingUserData?.data?.followers?.length > 0 ? (
                  followersAndFollowingUserData?.data?.followers?.map(
                    (item: any) => {
                      const isFollowing =
                        curentUserInfo?._id === item.following;
                      return (
                        <FollowerCard
                          handleRemoveFollower={handleRemoveFollower}
                          key={item._id}
                          item={item}
                          status="follower"
                          isFollowing={isFollowing}
                          isOwnProfile={isOwnProfile}
                        />
                      );
                    }
                  )
                ) : (
                  <p className="text-center pb-5">
                    Currently you don't have any followers.
                  </p>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>{' '}
      <Modal
        isOpen={isFollowingModalOpen}
        scrollBehavior="inside"
        size="md"
        onClose={onFollowingModalClose}
      >
        {' '}
        {/* Marked: Modal starts */}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Following
              </ModalHeader>
              <ModalBody>
                {followersAndFollowingUserData?.data?.followingUser?.length >
                0 ? (
                  followersAndFollowingUserData?.data?.followingUser?.map(
                    (item: any) => {
                      const isFollowing =
                        curentUserInfo?._id === item.following?._id;
                      return (
                        <FollowerCard
                          key={item._id}
                          item={item}
                          status="following"
                          isFollowing={isFollowing}
                          isOwnProfile={isOwnProfile}
                          handleUnfollowFollowingUserModalOpen={
                            handleUnfollowFollowingUserModalOpen
                          }
                        />
                      );
                    }
                  )
                ) : (
                  <p className="text-center pb-5">
                    Currently you don't follow anyone.
                  </p>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>{' '}
      <DeleteModal
        title={`Unfollow ${currentUserData?.data?.name}`}
        subTitle={`Are you sure want to unfollow ${currentUserData?.data?.name}?`}
        isOpen={isUnFollowModalOpen}
        onOpenChange={onUnFollowModalOpenChange}
        handleDeleteProduct={() => handleUnFollowUser()}
      />
      <DeleteModal
        title={`Unfollow ${unFollowFollowingUser?.name}`}
        subTitle={`Are you sure want to unfollow ${unFollowFollowingUser.name}?`}
        isOpen={isUnFollowFollowingModalOpen}
        onOpenChange={onUnfollowFollowingModalOPenChange}
        handleDeleteProduct={() => handleUnfollowFollowingUser()}
      />
      <VerificationModal
        isOpen={isVerificationModalOpen}
        onOpenChange={onVerifyModalOpenChange}
        handleVerifyProfile={handleVerifyProfile}
        loading={verifyLoading}
      />
    </div>
  );
};

export default ProfilePage;
