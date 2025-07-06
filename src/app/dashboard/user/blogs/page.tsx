"use client";
import Container from "@/src/components/Container";
import PostCard from "@/src/components/dashboard/PostCard";
import { useUser } from "@/src/context/user.provider";
import { useGetUserPost } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import React from "react";

const Blogs = () => {
  const { user } = useUser();
  const { data, isLoading } = useGetUserPost((user as any)?._id);
  if (isLoading) {
    return <p>Loading</p>;
  }

  console.log({ data });
  return (
    <Container>
      <div className="lg:mb-6 flex justify-between items-center">
        <p className="lg:text-2xl font-bold ">All Blogs</p>
        <div className=" ">
          <button
            className="bg-primary text-sm text-white font-bold px-3 py-2 rounded-md "
            // onClick={handleCreateProductMNodalOpen}
          >
            Create New +
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  mx-auto gap-4">
        {data?.data?.map((post: IPost) => (
          <PostCard post={post} />
        ))}
      </div>
    </Container>
  );
};

export default Blogs;
