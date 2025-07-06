"use client";
import React from "react";

import { useGetAllPosts, useGetSinglePost } from "@/src/hooks/post.hook";
import Container from "@/src/components/Container";
import moment from "moment";
import RecentPost from "@/src/components/posts/RecentPost";
// import { getSingleGardeningPost } from "@/src/services/CategoryService";

const PostPage = ({ params }: { params: { postId: string } }) => {
  const { data: singlePost } = useGetSinglePost(params?.postId);
  console.log({ singlePost });

  // const { data: postsData, isLoading } = useGetAllPosts();
  // const singlePost = postsData?.data?.filter(
  //   (item: any) => item._id === params.postId
  // )[0];
  // console.log(singlePost);
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  return (
    <div className="w-[90%] mx-auto flex gap-8">
      <section className="">
        <div className="flex items-center gap-8">
          <p> by {singlePost?.data?.user?.name}</p>
          <p className="text-[#B9A569] ">
            Posted on{" "}
            {moment(singlePost?.data?.createdAt).format("MMMM D YYYY")}
          </p>
        </div>

        {/* Images Section */}
        {singlePost?.data?.images?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {singlePost.data.images.map((image: string, index: number) => (
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
          dangerouslySetInnerHTML={{ __html: singlePost?.data?.content }}
        />
      </section>
    </div>
  );
};

export default PostPage;
