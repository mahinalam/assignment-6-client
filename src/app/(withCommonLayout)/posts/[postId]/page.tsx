"use client";
import React from "react";

import { useGetUserPost } from "@/src/hooks/post.hook";

const PostPage = ({ params }: { params: { postId: string } }) => {
  // const data = await getSingleGardeningPost(params?.postId);
  const { data } = useGetUserPost(params?.postId);

  console.log(data);

  return (
    <div>
      <section>
        <div>
          <p>By Mahin Alam</p>
          <p className="text-green-500">Posted on 20 sep 303</p>
        </div>
      </section>
    </div>
  );
};

export default PostPage;
