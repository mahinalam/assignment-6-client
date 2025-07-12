/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
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
} from "@nextui-org/react"; // Modal-related imports

import { useGetSingleUser, useVerifyUserProfile } from "@/src/hooks/auth.hook";
import {
  useFollowUser,
  useGetUserPost,
  useGetUserSavedPosts,
  useUnFollowUser,
} from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/user.provider";
import Container from "@/src/components/Container";
import FollowerCard from "@/src/components/profile/FolowerCard";
import Loading from "@/src/components/UI/Loading";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import PostImageCard from "./PostImageCard";
import { useGetPostReacts } from "@/src/hooks/react.hook";

const ProfilePage = ({ params }: { params: { userId: string } }) => {
  console.log({ params });
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const router = useRouter();

  const { user: curentUserInfo } = useUser();

  const { data: savedPosts } = useGetUserSavedPosts(
    curentUserInfo?._id as string
  );

  console.log("curentUserInfo", curentUserInfo);

  const { data: userPostInfo, isLoading: userPostInfoLoading } = useGetUserPost(
    params?.userId
  );

  console.log("userPostInfo", userPostInfo);
  // const { data: savedPostData, isLoading: savedPostLoading } =
  //   useGetUserSavedPosts(curentUserInfo?._id as string);

  // console.log("savedPostData", savedPostData);

  const { mutate: followUser, isSuccess: followUserSuccess } = useFollowUser();

  const { mutate: unFollowUserHook, isSuccess: unFollowUserSuccess } =
    useUnFollowUser();

  const {
    isOpen: isFollowModalOpen,
    onOpen: onFollowModalOpen,
    onClose: onFollowModalClose,
  } = useDisclosure();

  const {
    mutate: verifyProfile,
    isPending: verifyProfilePending,
    isSuccess: verifyProfileSuccess,
  } = useVerifyUserProfile();

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

  const posts = userPostInfo?.data;

  console.log(posts);
  const postCreatorUser = userPostInfo?.data[0]?.user;

  // const postCreatorUser = posts[0];
  console.log("postCreatorUser", postCreatorUser?._id);
  const { data: userFollowersData, isLoading: userFollowersDataLoading } =
    useGetSingleUser(postCreatorUser?._id);

  console.log("userFollowersData", userFollowersData);

  // chcek if the user alreday a follower
  useEffect(() => {
    if (
      postCreatorUser?.followers?.length > 0 &&
      postCreatorUser?.followers?.map(
        (follower: any) => follower === curentUserInfo?._id
      )
    ) {
      setIsFollower(true);
    } else {
      setIsFollower(false);
    }
  }, [curentUserInfo?._id, posts?.user]);

  console.log("isf", isFollower);
  // check if is own profile
  useEffect(() => {
    if (curentUserInfo?._id == postCreatorUser?._id) {
      setIsOwnProfile(true);
    } else {
      setIsOwnProfile(false);
    }
  }, [curentUserInfo?._id, postCreatorUser?._id]);

  // follow user
  const handleFollowUser = () => {
    if (postCreatorUser?._id && curentUserInfo?._id) {
      followUser({
        followingId: postCreatorUser?._id,
        followerId: curentUserInfo?._id,
      });
    }

    setIsFollower(true);

    onClose();
  };

  // unfollow user
  const handleUnFollowUser = () => {
    console.log("cliked");
    console.log("user id", curentUserInfo?._id);
    if (postCreatorUser?._id && curentUserInfo?._id) {
      unFollowUserHook({
        followingId: postCreatorUser?._id,
        followerId: curentUserInfo?._id,
      });
    }

    setIsFollower(false);
    onFollowModalClose();
  };

  // remove follower
  const removeFollower = (followerId: string) => {
    // console.log("followerId", followerId);
    // console.log('user id', curentUserInfo?._id);
    if (isOwnProfile) {
      unFollowUserHook(
        {
          followingId: curentUserInfo?._id,
          followerId,
        },
        {
          onSuccess: (res) => {
            console.log("res", res);
            if (res?.success) {
              queryClient.invalidateQueries({ queryKey: ["USER"] });
              toast.success("Follower removed!");
              onFollowerModalClose();
            }
          },
          onError: (error) => {
            toast.error("Something went wrong!");
            onFollowerModalClose();
          },
        }
      );
    }

    // setIsFollower(false);
    // onFollowModalClose();
  };

  // verify profile
  const handleVerifyProfile = () => {
    console.log("verify clicked");
    verifyProfile();
  };

  return (
    <Container>
      <div className="flex md:gap-15 gap-10 md:my-10 my-5">
        <div>
          <div className="flex gap-4">
            <div>
              <img
                alt=""
                className="md:size-[150px] size-[120px] rounded-full"
                src={postCreatorUser?.profilePhoto}
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 mr-5">
              <p className="font-bold">{postCreatorUser?.name}</p>
              {postCreatorUser?.isVerified === true && (
                <div>
                  <svg
                    className="size-6"
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
                </div>
              )}
            </div>
            {!isOwnProfile &&
              (isFollower ? (
                <Button onClick={() => onFollowModalOpen()}>Following</Button>
              ) : (
                <Button onClick={() => handleFollowUser()}>Follow</Button>
              ))}
            {isOwnProfile && (
              <>
                <Button onClick={() => router.push("/profile/edit-profile")}>
                  Edit Profile
                </Button>
                <Button onClick={onOpen}>Verify Profile</Button>{" "}
                {/* Marked: Button to open modal */}
              </>
            )}
          </div>
          <div className="flex items-center gap-5">
            <p>
              <span className="font-bold">{posts?.length}</span> posts
            </p>
            {/* // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <p className="cursor-pointer" onClick={() => onFollowerModalOpen()}>
              <span className="font-bold">
                {postCreatorUser?.followers?.length}
              </span>{" "}
              followers
            </p>
            <p
              className="cursor-pointer"
              onClick={() => onFollowingModalOpen()}
            >
              <span className="font-bold">
                {postCreatorUser?.following?.length}
              </span>{" "}
              following
            </p>
          </div>
          <div className="flex items-center gap-5">
            <p>{postCreatorUser?.email}</p>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        {" "}
        {/* Marked: Modal starts */}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Verify Profile
              </ModalHeader>
              <ModalBody>
                <p>
                  Verification Required: To proceed, a minimum balance of BDT
                  1000 is needed for account verification. Please ensure you
                  have sufficient funds to continue.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleVerifyProfile}>
                  Verify
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>{" "}
      <Modal isOpen={isFollowModalOpen} size="xl" onClose={onFollowModalClose}>
        {" "}
        {/* Marked: Modal starts */}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="">
                <button onClick={() => handleUnFollowUser()}>
                  {" "}
                  <span>Unfollow</span> <span>{postCreatorUser?.name}</span>
                </button>
              </ModalHeader>
              <ModalBody>
                <p>Are you sure want to unfollow {postCreatorUser?.name}?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleUnFollowUser}>
                  Unfollow
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>{" "}
      {/* Marked: Modal ends */}
      <div>
        <div className="flex w-full flex-col">
          <Tabs aria-label="Options" variant="solid">
            <Tab key="posts" title="POSTS">
              <div className="grid grid-cols-3 gap-5">
                {userPostInfo?.data?.length > 0 ? (
                  userPostInfo?.data?.map((item: any) => (
                    <PostImageCard image={item.images[0]} id={item._id} />
                  ))
                ) : (
                  <p>You don't have any post yet.</p>
                )}
              </div>
            </Tab>
            {isOwnProfile && (
              <Tab key="saved" title="SAVED">
                <div className="grid grid-cols-3 gap-5">
                  {savedPosts?.data?.length > 0 ? (
                    savedPosts?.data?.map((item: any) => (
                      <PostImageCard
                        image={item.post?.images[0]}
                        id={item.post._id}
                      />
                    ))
                  ) : (
                    <p>You don't have any post yet.</p>
                  )}
                </div>
              </Tab>
            )}
          </Tabs>
        </div>
      </div>
      <Modal
        isOpen={isFollowerModalOpen}
        scrollBehavior="inside"
        size="md"
        onClose={onFollowerModalClose}
      >
        {" "}
        {/* Marked: Modal starts */}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Followers
              </ModalHeader>
              <ModalBody>
                <div>{/* <FollowerCard /> */}</div>
                {/* {userFollowersData?.data?.followers.map((item) => (
                  // <FollowerCard key={item._id} item={item} />
                ))} */}
                {userFollowersData?.data?.followers?.length > 0 ? (
                  userFollowersData?.data?.followers?.map((item: any) => (
                    <FollowerCard
                      removeFollower={removeFollower}
                      key={item._id}
                      item={item}
                      status="follower"
                    />
                  ))
                ) : (
                  <p className="text-center pb-5">
                    Currently you don't have any followers.
                  </p>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>{" "}
      <Modal
        isOpen={isFollowingModalOpen}
        scrollBehavior="inside"
        size="md"
        onClose={onFollowingModalClose}
      >
        {" "}
        {/* Marked: Modal starts */}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Following
              </ModalHeader>
              <ModalBody>
                <div>{/* <FollowerCard /> */}</div>
                {/* {userFollowersData?.data?.followers.map((item) => (
                  // <FollowerCard key={item._id} item={item} />
                ))} */}
                {userFollowersData?.data?.following?.length > 0 ? (
                  userFollowersData?.data?.following?.map((item: any) => (
                    <FollowerCard
                      key={item._id}
                      item={item}
                      status="following"
                    />
                  ))
                ) : (
                  <p className="text-center pb-5">
                    Currently you don't follow anyone.
                  </p>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>{" "}
    </Container>
  );
};

export default ProfilePage;
