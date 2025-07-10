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
import React from "react";

import { useGetAllPosts, useGetSinglePost } from "@/src/hooks/post.hook";
import Container from "@/src/components/Container";
import moment from "moment";
import RecentPost from "@/src/components/posts/RecentPost";
import { useGetSingleBlog } from "@/src/hooks/blog.hook";
import Link from "next/link";
import { useGetAllComments } from "@/src/hooks/comment.hook";
import { useUser } from "@/src/context/user.provider";
import { useGetPostReacts } from "@/src/hooks/react.hook";
const PostDetails = ({ params }: { params: { postId: string } }) => {
  const { data: singleBlog, isLoading } = useGetSinglePost(params?.postId);

  // const { data } = useGetPostReacts(params?.postId);
  // console.log("react data", data);

  // const { data: postsData, isLoading } = useGetAllPosts();
  // const singlePost = postsData?.data?.filter(
  //   (item: any) => item._id === params.postId
  // )[0];

  const { user: currentUser } = useUser();

  const {
    data: commentsData,
    isLoading: commentsDataLoading,
    isError,
    error,
    isSuccess,
  } = useGetAllComments({ post: params?.postId, user: currentUser?._id });

  console.log(singleBlog);
  if (isLoading || commentsDataLoading) {
    return <p>Loading...</p>;
  }

  console.log({ commentsData });

  const { user } = singleBlog?.data;
  return (
    <div className="w-[90%] mx-auto ">
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
          {singleBlog?.data?.images?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {singleBlog.data.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  // alt={`Post Image ${index + 1}`}
                  // alt="image"
                  alt=""
                  className="w-full h-auto rounded-lg shadow-md"
                />
              ))}
            </div>
          )}

          {/* Post Content */}
          <div
            className="post-content mt-6 text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: singleBlog?.data?.content }}
          />
        </section>
      </div>
      {/* <div className="flex items-center gap-5">
        <div>
          <p className="font-bold">{upVotes?.length} likes</p>
        </div>
        <div>
          <p className="font-bold">{downVotes?.length} dislikes</p>
        </div>
      </div>
      <div> */}
      {/* <div className="cursor-pointer font-extralight">
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
      </form> */}
    </div>
  );
};

export default PostDetails;
