"use client";
import BlogCard from "@/src/components/dashboard/BlogCard";
import PostCard from "@/src/components/dashboard/PostCard";
import { useGetAllBlogs } from "@/src/hooks/blog.hook";
import { IBlog } from "@/src/types";
import React from "react";
import SingleBlogCard from "./SingleBlogCard";
import RightSection from "@/src/components/sharred/RightSection";
import BlogRightSection from "./BlogRightSection";

const BlogfsPage = () => {
  const { data: blogs } = useGetAllBlogs();
  //   console.log("blogs", data);
  return (
    <div className="flex items-start gap-4">
      <div className="lg:w-9/12 w-full">
        <p className="flex items-center justify-center font-bold lg:text-2xl py-4">
          Blogs
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 grid-cols-1">
          {blogs?.data?.map((blog: IBlog) => (
            <SingleBlogCard post={blog} />
          ))}
        </div>
      </div>
      <div className="lg:w-3/12 lg:block hidden">
        <BlogRightSection />
      </div>
    </div>
  );
};

export default BlogfsPage;
