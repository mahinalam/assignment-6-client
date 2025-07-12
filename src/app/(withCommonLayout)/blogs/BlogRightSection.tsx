"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/AuthService";
import { useRouter } from "next/navigation";
import { useGetAllPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { useGetSingleUser } from "@/src/hooks/auth.hook";
import { LuUserRound } from "react-icons/lu";
import SuggesstedCard from "@/src/components/sharred/SuggesstedCard";
import { useGetAllBlogs } from "@/src/hooks/blog.hook";

const BlogRightSection = () => {
  const { user, setIsLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: currentUserInfo } = useGetSingleUser();

  const { data: blogsData, isLoading, isSuccess } = useGetAllBlogs();

  if (isLoading) {
    return <p>Loading</p>;
  }

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    router.push("/login");
  };
  return (
    <div className="relative cursor-pointer">
      {/* profile image section */}
      <div
        onClick={() => setIsOpen((val) => !val)}
        className="flex gap-2 items-center"
      >
        <div className="">
          {currentUserInfo?.data?.profilePhoto ? (
            <img
              alt=""
              className="size-[40px] rounded-full mr-2"
              src={currentUserInfo?.data?.profilePhoto}
            />
          ) : (
            <LuUserRound size={40} />
          )}
        </div>
        <div>
          <p className="lg:text-sm">mahinalam@gmail.com</p>
          <p className="text-subTitle ">Mahin</p>
        </div>

        {/* <p className="ml-2 font-extralight ">1d</p> */}
      </div>

      {/* suggessted people */}
      <div>
        <p className="lg:text-lg w-[80%] border-b-4 border-b-border text-subTitle lg:mt-8 mb-5 pb-2">
          Recent Blogs
        </p>
        {!isLoading &&
          isSuccess &&
          blogsData?.data?.slice(0, 5)?.map((post: IPost) => (
            <Link href={`/posts/${post._id}`} key={post._id}>
              <SuggesstedCard title={post.title} />
            </Link>
          ))}
      </div>
      {isOpen && (
        <div className="absolute  z-50  bg-white rounded-xl shadow-md w-[40vw] md:w-[10vw]  overflow-hidden  top-14 text-sm">
          <div className="flex flex-col pl-4 cursor-pointer">
            <>
              <Link
                className=" text-black -4 py-2 hover:bg-neutral-100 transition font-semibold"
                href={`/profile/${user?._id}`}
              >
                Profile
              </Link>
              <Link
                href="/dashboard"
                className=" text-black -4 py-2 hover:bg-neutral-100 transition font-semibold"
              >
                Dashboard
              </Link>

              <Link
                href="/dashboard/user/wishlist"
                className=" text-black -4 py-2 hover:bg-neutral-100 transition font-semibold"
              >
                Saved Post
              </Link>
              <Link
                href="/"
                className=" text-black -4 py-2 hover:bg-neutral-100 transition font-semibold"
              >
                Premium Subscription
              </Link>
              <span
                className=" text-red-500  py-2 hover:bg-neutral-100 transition font-semibold"
                onClick={handleLogout}
              >
                Logout
              </span>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogRightSection;
