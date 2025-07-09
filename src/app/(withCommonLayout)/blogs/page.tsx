"use client";
import BlogCard from "@/src/components/dashboard/BlogCard";
import PostCard from "@/src/components/dashboard/PostCard";
import { useGetAllBlogs } from "@/src/hooks/blog.hook";
import { IBlog } from "@/src/types";
import React from "react";
import SingleBlogCard from "./SingleBlogCard";

const BlogfsPage = () => {
  const { data: blogs } = useGetAllBlogs();
  //   console.log("blogs", data);
  return (
    <div>
      <p>Blogs</p>
      <div className="grid lg:grid-cols-3 gap-4 grid-cols-1">
        {blogs?.data?.map((blog: IBlog) => (
          <SingleBlogCard post={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogfsPage;
