// "use client";
// import React from "react";

// import { useGetAllPosts, useGetSinglePost } from "@/src/hooks/post.hook";
// import Container from "@/src/components/Container";
// import moment from "moment";
// import RecentPost from "@/src/components/posts/RecentPost";
// // import { getSingleGardeningPost } from "@/src/services/CategoryService";

// const PostPage = ({ params }: { params: { postId: string } }) => {
//   const { data: singlePost } = useGetSinglePost(params?.postId);
//   console.log({ singlePost });

//   // const { data: postsData, isLoading } = useGetAllPosts();
//   // const singlePost = postsData?.data?.filter(
//   //   (item: any) => item._id === params.postId
//   // )[0];
//   // console.log(singlePost);
//   // if (isLoading) {
//   //   return <p>Loading...</p>;
//   // }
//   return (
//     <div className="w-[90%] mx-auto flex gap-8">
//       <section className="">
//         <div className="flex items-center gap-8">
//           <p> by {singlePost?.data?.user?.name}</p>
//           <p className="text-[#B9A569] ">
//             Posted on{" "}
//             {moment(singlePost?.data?.createdAt).format("MMMM D YYYY")}
//           </p>
//         </div>

//         {/* Images Section */}
//         {singlePost?.data?.images?.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//             {singlePost.data.images.map((image: string, index: number) => (
//               <img
//                 key={index}
//                 src={image}
//                 // alt={`Post Image ${index + 1}`}
//                 // alt="image"
//                 alt=""
//                 className="w-full h-auto rounded-lg shadow-md"
//               />
//             ))}
//           </div>
//         )}

//         {/* Post Content */}
//         <div
//           className="post-content mt-6 text-gray-800 leading-relaxed"
//           dangerouslySetInnerHTML={{ __html: singlePost?.data?.content }}
//         />
//       </section>
//     </div>
//   );
// };

// export default PostPage;

"use client";
import React, { useState } from "react";

import {
  useCreateSharePost,
  useGetAllPosts,
  useGetSinglePost,
  useGetUserSavedPosts,
} from "@/src/hooks/post.hook";
import Container from "@/src/components/Container";
import moment from "moment";
import RecentPost from "@/src/components/posts/RecentPost";
import Link from "next/link";
import { useCreateComment, useGetAllComments } from "@/src/hooks/comment.hook";
import { useUser } from "@/src/context/user.provider";
import { useCreateReact, useGetPostReacts } from "@/src/hooks/react.hook";
import { Input } from "@nextui-org/input";
import { useQueryClient } from "@tanstack/react-query";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import CommentCard from "@/src/components/CommentCard";
import { IoShareSocialOutline } from "react-icons/io5";
import { IUser } from "@/src/types";
import ShareModal from "@/src/components/modal/ShareModal";
import { toast } from "sonner";
import { useGetSingleUser } from "@/src/hooks/auth.hook";

const PostDetails = ({ params }: { params: { postId: string } }) => {
  const { data: singlePost, isLoading } = useGetSinglePost(params?.postId);
  const queryClient = useQueryClient();
  const { mutate: handleCreateComment, isPending: createCommentPending } =
    useCreateComment();
  // const { data } = useGetPostReacts(params?.postId);
  // console.log("react data", data);

  // const { data: postsData, isLoading } = useGetAllPosts();
  // const singlePost = postsData?.data?.filter(
  //   (item: any) => item._id === params.postId
  // )[0];
  console.log({ singlePost });
  const { user: currentUser } = useUser();
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: sharePostFn } = useCreateSharePost();
  const {
    data: commentsData,
    isLoading: commentsDataLoading,
    isError,
    error,
    isSuccess,
  } = useGetAllComments({ post: params?.postId, user: currentUser?._id });

  const {
    isOpen: isShareModalOpen,
    onOpen: onShareModalOpen,
    onOpenChange: onShareModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isWishlistModalOpen,
    onOpen: onWishlistModalOpen,
    onOpenChange: onWishlistModalOpenChange,
  } = useDisclosure();

  const { mutate: createReact } = useCreateReact();

  const { data: reactData, isLoading: reactLoading } = useGetPostReacts(
    params.postId
  );

  const [text, setText] = useState("");
  const { data: singleUser } = useGetSingleUser();

  const { data: userSavedPosts, isLoading: savedPostLoading } =
    useGetUserSavedPosts((currentUser as IUser)?._id, params.postId);

  if (isLoading || commentsDataLoading || reactLoading) {
    return <p>Loading...</p>;
  }

  console.log({ commentsData });
  const allPostComments = commentsData?.data?.filter(
    (item: any) => item?.post?._id === params?.postId
  );

  const myOwnComments =
    allPostComments?.length > 0 &&
    allPostComments.filter((item: any) => item?.user?._id === currentUser?._id);
  const { user } = singlePost?.data;

  // for comment
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // comment modal open
  const handleModalOpen = () => {
    setIsModalOpen(true); // Open modal
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

  // create share fn
  const createSharePost = () => {
    const id = toast.loading("Posting...");
    const payload = {
      post: params.postId,
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

  const like = reactData?.data?.like?.count || 0;
  const disLike = reactData?.data?.dislike?.count || 0;
  // comment submit
  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    if (comment.trim()) {
      const commentInfo = {
        post: params.postId,
        user: currentUser?._id,
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
      post: params.postId,
      type,
    };

    createReact(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["REACT", params.postId] });
      },
    });
  };

  // commenbt modal close
  const handleModalClose = () => {
    setIsModalOpen(false); // Close modal
  };
  return (
    <div className="w-[80%] mx-auto ">
      <Link className="flex items-center" href={`/profile/${user?._id}`}>
        <div>
          <img
            alt=""
            className="size-[40px] rounded-full mr-2"
            src={user?.profilePhoto}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            {" "}
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
          </div>
          <p>9 months ago</p>
        </div>

        {/* <p className="ml-2 font-extralight ">1d</p> */}
      </Link>
      <div className="">
        <section className="">
          {/* Images Section */}
          {singlePost?.data?.images?.length > 0 && (
            <div className="grid grid-cols-1  gap-4 mt-6">
              {singlePost.data.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  // alt={`Post Image ${index + 1}`}
                  // alt="image"
                  alt=""
                  className="h-[500px] w-full object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          )}

          {/* Post Content */}
          <div
            className="post-content mt-6 text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: singlePost?.data?.content }}
          />
        </section>
      </div>
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
        <div className="cursor-pointer my-1 font-extralight">
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
                <p>{currentUser?.name}</p>
                <p className="text-slate-500">{comment.content}</p>
              </div>
            ))}
        </div>
      </div>
      <form onSubmit={handleCommentSubmit}>
        <div className="relative mt-1">
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
                  src={singlePost?.data?.images?.[0] || ""}
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
      <ShareModal
        isOpen={isShareModalOpen}
        onOpenChange={onShareModalOpenChange}
        user={singleUser?.data}
        createSharePost={createSharePost}
        setText={setText}
        text={text}
        clipBoard={`${process.env.NEXT_PUBLIC_CLIENT_API}/posts/${params.postId}`}
      />
    </div>
  );
};

export default PostDetails;
