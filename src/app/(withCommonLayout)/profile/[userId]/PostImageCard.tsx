"use client";
import { useGetPostReacts } from "@/src/hooks/react.hook";
import Link from "next/link";
import React from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import PostImageCardSkeleton from "./PostImageCardLoading";

interface Props {
  image: string;
  id: string;
}

const PostImageCard = ({ image, id }: Props) => {
  const { data: reactData, isLoading } = useGetPostReacts(id);
  if (isLoading) {
    return <PostImageCardSkeleton />;
  }
  return (
    <Link href={`/posts/${id}`}>
      {" "}
      <div className="relative w-full aspect-square group overflow-hidden">
        {/* Image */}
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-semibold text-lg">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <FaHeart />
              <span>{reactData?.data?.like?.count}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaComment />
              <span>{reactData?.data?.comments?.count}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostImageCard;
