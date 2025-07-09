"use client";
import React from "react";

import { useGetAllPosts, useGetSinglePost } from "@/src/hooks/post.hook";
import Container from "@/src/components/Container";
import moment from "moment";
import RecentPost from "@/src/components/posts/RecentPost";
import { useGetSingleBlog } from "@/src/hooks/blog.hook";
import Link from "next/link";
const BlogDetails = ({ params }: { params: { blogId: string } }) => {
  const { data: singleBlog, isLoading } = useGetSingleBlog(params?.blogId);

  // const { data: postsData, isLoading } = useGetAllPosts();
  // const singlePost = postsData?.data?.filter(
  //   (item: any) => item._id === params.postId
  // )[0];
  console.log(singleBlog);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { author } = singleBlog?.data;
  return (
    <div className="w-[90%] mx-auto ">
      <Link className="flex items-center" href={`/profile/${author?._id}`}>
        <div>
          <img
            alt=""
            className="size-[40px] rounded-full mr-2"
            src={author?.profilePhoto}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            {" "}
            <p className="font-bold mr-1 text-medium">{author?.name}</p>
            {author?.isVerified === true && (
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
    </div>
  );
};

export default BlogDetails;
