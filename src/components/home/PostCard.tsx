"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import SkeletonLoading from "../UI/SkeletonLoading";
import CommentCard from "../CommentCard";

import { useCreateComment, useGetAllComments } from "@/src/hooks/comment.hook";
import { useUser } from "@/src/context/user.provider";
import {
  useCreateSavedPost,
  useUpdateLikeStatus,
  useUpdatePost,
} from "@/src/hooks/post.hook";

const PostCard = ({ item, refetch }: { item: any; refetch?: any }) => {
  const queryClient = useQueryClient();
  const { _id, images, votes, user, upVotes, downVotes, title } = item;
  console.log({ item });

  const { user: currentUserData } = useUser();
  console.log("currentUserData", currentUserData);

  // const [myOwnComments, setIsMyOwnComments] = useState<any>(null);
  // const [totalLikes, setTotalLikes] = useState(votes);
  const [isOwnUpVote, setIsOwnUpVote] = useState(false);
  const [isOwnDownVote, setIsOwnDownVote] = useState(false);
  const [isSavedPost, setIsSavedPost] = useState(false);

  // const [isOwnUpVotes, setIs]
  const [comment, setComment] = useState("");
  // const [isLikedButtonCliked, setIsLikeButtonCliked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const { mutate: handleUpdatePost } = useUpdatePost();

  const { mutate: handleCreateComment, isPending: createCommentPending } =
    useCreateComment();
  const { mutate: handleCreateSavedPost, isPending: createSavedPostPending } =
    useCreateSavedPost();

  const { mutate: likeStatus } = useUpdateLikeStatus();

  const { user: currentUserInfo } = useUser();

  const {
    data: commentsData,
    isLoading: commentsDataLoading,
    isError,
    error,
    isSuccess,
  } = useGetAllComments();
  // console.log("commentsData", commentsData);
  // console.log("isSuccess", isSuccess);
  // console.log({ isError });
  // console.log({ error });
  const allPostComments = commentsData?.data?.filter(
    (item: any) => item?.post?._id == _id
  );
  // console.log("allPostComments", allPostComments);
  const myOwnComments =
    allPostComments?.length > 0 &&
    allPostComments.filter(
      (item: any) => item?.user?._id === currentUserInfo?._id
    );

  useEffect(() => {
    const upVoteMatches = upVotes?.filter(
      (vote: string) => vote === currentUserInfo?._id
    );
    const downVoteMatches = downVotes?.filter(
      (vote: string) => vote === currentUserInfo?._id
    );

    setIsOwnUpVote(upVoteMatches?.length > 0);
    setIsOwnDownVote(downVoteMatches?.length > 0);
  }, [upVotes, downVotes, currentUserInfo, isOwnUpVote, isOwnDownVote]);
  // useEffect(() => {
  //   if (currentUserInfo) {
  //     setIsOwnUpVote(upVotes?.includes(currentUserInfo?._id));
  //     setIsOwnDownVote(downVotes?.includes(currentUserInfo?._id));
  //   }
  // }, [upVotes, downVotes, currentUserInfo]);

  // if (commentsDataLoading) return <SkeletonLoading />;
  // if (commentsDataLoading) {
  //   return <SkeletonLoading />;
  // }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

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

  const handleUpVotes = (status: string) => {
    if (!isOwnUpVote && !isOwnDownVote) {
      const data = {
        postId: _id,
        userId: currentUserInfo?._id,
        status,
      };
      if (status === "like") {
        setIsOwnUpVote(true);
      }
      if (status === "dislike") {
        setIsOwnDownVote(true);
      }
      likeStatus(data, {
        onSuccess: (res) => {
          // console.log("success");

          queryClient.invalidateQueries({ queryKey: ["POST"] });
        },
      });
    }
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

  return (
    <div className="space-y-2 mt-1 md:w-[80%] w-full mx-auto h-auto">
      '{" "}
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
      '
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
            <svg
              className={`size-7 ${
                isOwnDownVote || isOwnUpVote
                  ? isOwnUpVote
                    ? "text-[#4CAF50] fill-[#4CAF50] cursor-not-allowed"
                    : "cursor-not-allowed"
                  : "cursor-pointer"
              } `}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleUpVotes("like")}
            >
              <path
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              fill="none"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleUpVotes("dislike")}
              stroke="currentColor"
              // className={`size-7 ${isOwnDownVote ? "text-blue-500 cursor-not-allowed" : "cursor-pointer"} `}
              className={`size-7 ${
                isOwnDownVote || isOwnUpVote
                  ? isOwnDownVote
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
          </div>

          <svg
            className={`size-7 ${
              isSavedPost
                ? "text-red-600 fill-red-600"
                : "text-gray-500 fill-none"
            } cursor-pointer transition-colors duration-200 ease-in-out`}
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleSavedPostCollection()}
          >
            <path
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div>
          <p className="font-bold">{upVotes?.length} likes</p>
        </div>
        <div>
          <p className="font-bold">{downVotes?.length} dislikes</p>
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
          {/* <ModalFooter>
            <Button onPress={handleModalClose}>Close</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
      <div>
        <p className="border-b-1 opacity-40" />
      </div>
    </div>
  );
};

export default PostCard;
