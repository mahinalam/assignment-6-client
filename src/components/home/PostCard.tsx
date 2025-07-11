"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import CommentCard from "../CommentCard";
import { useCreateComment, useGetAllComments } from "@/src/hooks/comment.hook";
import { useUser } from "@/src/context/user.provider";
import {
  useCreateSavedPost,
  useCreateSharePost,
  useGetUserSavedPosts,
} from "@/src/hooks/post.hook";
import { useCreateReact, useGetPostReacts } from "@/src/hooks/react.hook";
import { IUser } from "@/src/types";
import WishlistModal from "../modal/WishlistModal";
import { useRouter } from "next/navigation";
import { AiOutlineLike } from "react-icons/ai";
import { IoShareSocialOutline } from "react-icons/io5";
import ShareModal from "../modal/ShareModal";
import { useGetSingleUser } from "@/src/hooks/auth.hook";
import { toast } from "sonner";
import PostCardSkeleton from "./PostCardLoading";

const PostCard = ({ item, refetch }: { item: any; refetch?: any }) => {
  const queryClient = useQueryClient();
  const { _id, images, votes, user, upVotes, downVotes, title } = item;
  const [isSavedPost, setIsSavedPost] = useState(false);
  const [text, setText] = useState("");

  // const [isOwnUpVotes, setIs]
  const [comment, setComment] = useState("");
  // const [isLikedButtonCliked, setIsLikeButtonCliked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const { mutate: handleCreateComment, isPending: createCommentPending } =
    useCreateComment();
  const { mutate: handleCreateSavedPost, isPending: createSavedPostPending } =
    useCreateSavedPost();

  const { mutate: createReact } = useCreateReact();

  const { user: currentUserInfo } = useUser();

  const { data: singleUser } = useGetSingleUser();

  const { data: commentsData, isLoading: commentsDataLoading } =
    useGetAllComments();
  const { data: reactData, isLoading } = useGetPostReacts(_id);

  const { data: userSavedPosts, isLoading: savedPostLoading } =
    useGetUserSavedPosts((currentUserInfo as IUser)?._id, _id);

  // for wiushlist
  const {
    isOpen: isWishlistModalOpen,
    onOpen: onWishlistModalOpen,
    onOpenChange: onWishlistModalOpenChange,
  } = useDisclosure();

  // for share
  const {
    isOpen: isShareModalOpen,
    onOpen: onShareModalOpen,
    onOpenChange: onShareModalOpenChange,
  } = useDisclosure();

  const router = useRouter();
  // all post comments
  const allPostComments = commentsData?.data?.filter(
    (item: any) => item?.post?._id == _id
  );

  const { mutate: sharePostFn } = useCreateSharePost();

  const myOwnComments =
    allPostComments?.length > 0 &&
    allPostComments.filter(
      (item: any) => item?.user?._id === currentUserInfo?._id
    );

  if (isLoading || commentsDataLoading || savedPostLoading) {
    return <PostCardSkeleton />;
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // add to wishlist
  const handleAddToWishlist = async () => {
    try {
      onWishlistModalOpen();
      // const res = await addToWishlist({ productId: id }).unwrap();
      // if (res?.success) onWishlistModalOpen();
    } catch (error: any) {
      // toast.error(error.data.message);
    }
  };

  const like = reactData?.data?.like?.count || 0;
  const disLike = reactData?.data?.dislike?.count || 0;

  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    if (comment.trim()) {
      const commentInfo = {
        post: _id,
        user: currentUserInfo?._id,
        content: comment,
      };

      handleCreateComment(commentInfo, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: ["COMMENTS"] });
        },
      });
      setComment(""); // Reset input after submission
    }
  };

  // create post
  const handleCreateReact = (type: string) => {
    const payload = {
      post: _id,
      type,
    };

    createReact(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["REACT", _id] });
      },
    });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleSavedPostCollection = () => {
    const data = {
      post: _id,
      user: currentUserInfo?._id,
    };

    handleCreateSavedPost(data);
    setIsSavedPost(true);
  };

  const handleGoToWishlistPage = () => router.push("/dashboard/user/wishlist");

  const wishlistSubtitle =
    userSavedPosts?.data?.length > 0
      ? `${title} post is already added to saved post.`
      : `${title} post has been added to saved post.`;

  // create share fn
  const createSharePost = () => {
    const id = toast.loading("Posting...");
    const payload = {
      post: _id,
      user: user?._id,
      title: text,
    };

    sharePostFn(payload, {
      onSuccess: () => {
        toast.success("Post shared successfully!", { id });
        onShareModalOpenChange();
      },
    });
  };

  return (
    <div className="space-y-2 mt-1 md:w-[80%] w-full mx-auto h-auto">
      {" "}
      <Link className="flex items-center" href={`/profile/${user?._id}`}>
        <div>
          <img
            alt=""
            className="size-[40px] rounded-full mr-2"
            src={user?.profilePhoto}
          />
        </div>
        <p className="font-bold mr-1 text-medium">{user?.name}</p>
        {user?.isVerified === true && (
          <div>
            <svg
              className="size-4"
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

        {/* <p className="ml-2 font-extralight ">1d</p> */}
      </Link>
      <Link href={`posts/${_id}`}>
        {" "}
        <section className="space-y-3">
          <div>
            <p className="text-2xl font-light">{title}</p>
          </div>
        </section>
        <div className="relative">
          <img alt="" src={images?.[0] || ""} />
        </div>
      </Link>
      <div>
        <div className="flex items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-10 ">
            <div className="flex items-center gap-2 ">
              {/* <AiOutlineLike
                className={` ${
                  !!like || !!disLike
                    ? like
                      ? "text-[#4CAF50] !fill-[#4CAF50] cursor-not-allowed"
                      : "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                size={30}
              /> */}
              {/* <svg
                className={`size-7 transition-colors duration-200 ease-in-out ${
                  like
                    ? "text-[#1877F2] cursor-not-allowed"
                    : disLike
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:text-[#1877F2] cursor-pointer"
                }`}
                fill="currentColor" // ✅ Important!
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => !like && !disLike && handleLike()}
              >
                <path d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904" />
              </svg> */}
              <svg
                className={`size-7 ${
                  !!like || !!disLike
                    ? like
                      ? "text-secondary fill-secondary cursor-not-allowed"
                      : "cursor-not-allowed"
                    : "cursor-pointer"
                } `}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                fill={`${like ? "currentColor" : "none"} `}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>

              {/* <svg
                className={`size-7 ${
                  !!like || !!disLike
                    ? like
                      ? "text-[#4CAF50] fill-[#4CAF50] cursor-not-allowed"
                      : "cursor-not-allowed"
                    : "cursor-pointer"
                } `}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleCreateReact("like")}
              >
                <path
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
              <p className="text-[#65686C]">{like}</p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                fill={`${disLike ? "currentColor" : "none"} `}
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleCreateReact("dislike")}
                stroke="currentColor"
                // className={`size-7 ${isOwnDownVote ? "text-blue-500 cursor-not-allowed" : "cursor-pointer"} `}
                className={`size-7 ${
                  !!like || !!disLike
                    ? disLike
                      ? "text-blue-500 fill-blue-500 cursor-not-allowed"
                      : "cursor-not-allowed"
                    : "cursor-pointer"
                } `}
              >
                <path
                  d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-[#65686C]">{disLike}</p>
            </div>
            <IoShareSocialOutline
              className="cursor-pointer"
              onClick={onShareModalOpen}
              size={28}
            />
          </div>

          <svg
            className={`size-7 ${
              userSavedPosts?.data?.length > 0
                ? "text-red-600 fill-red-600"
                : "text-gray-500 fill-none"
            } cursor-pointer transition-colors duration-200 ease-in-out`}
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleAddToWishlist()}
          >
            <path
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div>
        <div className="cursor-pointer font-extralight">
          {allPostComments?.length > 0 ? (
            <button onClick={handleModalOpen}>
              View all {allPostComments?.length} comments{" "}
            </button>
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
      <div>
        <div className="">
          {myOwnComments?.length > 0 &&
            myOwnComments.slice(0, 1).map((comment: any) => (
              <div
                key={comment._id}
                className="flex items-center gap-1 font-bold"
              >
                <p>{currentUserInfo?.name}</p>
                <p>{comment.content}</p>
              </div>
            ))}
        </div>
      </div>
      <form onSubmit={handleCommentSubmit}>
        <div className="relative">
          {createCommentPending ? (
            <p>Loading ...</p>
          ) : (
            <>
              <Input
                fullWidth
                aria-label="comment-input"
                placeholder="Add a comment..."
                style={{ paddingRight: "3rem", backgroundColor: "transparent" }}
                value={comment}
                onChange={handleInputChange}
              />
              {comment && (
                <button className="absolute bottom-2 right-10">
                  <span className="text-blue-500">Post</span>
                </button>
              )}
            </>
          )}
        </div>
      </form>
      {/* Modal */}
      <Modal
        className="mt-16"
        isOpen={isModalOpen}
        size="5xl"
        onClose={handleModalClose}
      >
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalBody>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <div>
                {/* <Image alt=""  src={img} /> */}
                <img
                  alt=""
                  className="h-[80vh] w-full"
                  src={images?.[0] || ""}
                />
              </div>
              <div className="">
                {allPostComments?.map((comment: any) => (
                  <div key={comment._id}>
                    <CommentCard comment={comment} />
                    {/* <div>Mahindhgdfuhguhdghug</div> */}
                  </div>
                ))}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div>
        <p className="border-b-1 opacity-40" />
      </div>
      <WishlistModal
        btn1="VIEW"
        btn2="CLOSE"
        handleRemoveCart={handleGoToWishlistPage}
        isOpen={isWishlistModalOpen}
        subTitle={wishlistSubtitle}
        onOpenChange={onWishlistModalOpenChange}
      />
      <ShareModal
        isOpen={isShareModalOpen}
        onOpenChange={onShareModalOpenChange}
        user={singleUser?.data}
        createSharePost={createSharePost}
        setText={setText}
        text={text}
        clipBoard={`${process.env.NEXT_PUBLIC_CLIENT_API}/posts/${_id}`}
      />
    </div>
  );
};

export default PostCard;
