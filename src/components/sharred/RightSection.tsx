"use client";
import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import NavComponent from "./NavComponent";
import Link from "next/link";
import { useUser } from "@/src/context/user.provider";
import SuggesstedCard from "./SuggesstedCard";
import { logout } from "@/src/services/AuthService";
import { useRouter } from "next/navigation";

const RightSection = () => {
  const { user, setIsLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    router.push("/login");
  };

  console.log({ user });
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => setIsOpen((val) => !val)}
    >
      {/* profile image section */}
      <div className="flex gap-2 items-center">
        <div className="">
          <img
            alt=""
            className="size-[40px] rounded-full mr-2"
            src={user?.profilePhoto}
          />
        </div>
        <div>
          <p className="lg:text-sm">mahinalam@gmail.com</p>
          <p className="text-subTitle ">Mahin</p>
        </div>

        {/* <p className="ml-2 font-extralight ">1d</p> */}
      </div>

      {/* suggessted people */}
      <div>
        <p className="text-sm font- text-subTitle lg:mt-8 mb-5">
          Suggested for you
        </p>
        <SuggesstedCard />
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

export default RightSection;
