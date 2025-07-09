"use client";
import PostCard from "@/src/components/dashboard/PostCard";
import WishlistCard from "@/src/components/dashboard/WishlistCard";
import { useUser } from "@/src/context/user.provider";
import { useGetUserSavedPosts } from "@/src/hooks/post.hook";
import { IWishlistItem } from "@/src/types";
import React from "react";

const Wishlist = () => {
  const { user } = useUser();
  console.log({ user });
  const { data } = useGetUserSavedPosts(user?._id as string);
  console.log("saved post", data);

  return (
    <div>
      <div>
        <p className="lg:text-2xl font-bold ">Saved Posts</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3  mx-auto gap-4">
        {data?.data?.map((wishlistItem: IWishlistItem) => {
          console.log({ wishlistItem });
          return <WishlistCard post={wishlistItem} />;
        })}
      </div>
    </div>
  );
};

export default Wishlist;
