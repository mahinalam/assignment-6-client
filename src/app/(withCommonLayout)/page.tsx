"use client";

import React from "react";

import Container from "@/src/components/Container";
import PostCard from "@/src/components/home/PostCard";
import { useGetAllPosts } from "@/src/hooks/post.hook";

const Home = () => {
  // const { data } = await getAllGardeningPosts();
  const { data: postsData, isLoading } = useGetAllPosts();

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <Container>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {postsData?.data?.map((item: any) => (
          <PostCard key={item._id} item={item} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
