"use client";

import React, { act, useState } from "react";
import NavComponent from "./NavComponent";
import { AiOutlineHome } from "react-icons/ai";
import { SiReaddotcv } from "react-icons/si";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import { useUser } from "@/src/context/user.provider";
import { CiHeart } from "react-icons/ci";
import { Input } from "@nextui-org/input";
import { IoBookmarkOutline } from "react-icons/io5";
import { GrContact } from "react-icons/gr";
import { useGetSingleUser } from "@/src/hooks/auth.hook";
import { LuUserRound } from "react-icons/lu";

const LeftSection = () => {
  const { user } = useUser();
  const { data: currentUserInfo } = useGetSingleUser();
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="border-r-2 fixed p-5 inset-0 w-2/12">
      <Input
        //   className=""
        type="text"
        placeholder="Search posts..."
        // value={searchTerm}
        // onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input change
        className="rounded mb-3  w-full ml-auto placeholder:text-green-600"
        size="lg"
        startContent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        }
      />
      <div className="!py-7 ">
        <Link href="/">Green Haven</Link>
      </div>
      <NavComponent
        onClick={() => setActiveTab("home")}
        activeTab={activeTab === "home"}
        icon={AiOutlineHome}
        address="/"
        title="Home"
      />
      <NavComponent
        onClick={() => setActiveTab("blogs")}
        activeTab={activeTab === "blogs"}
        icon={MdOutlineTipsAndUpdates}
        title="Blogs"
        address="/blogs"
      />
      <NavComponent
        onClick={() => setActiveTab("create")}
        activeTab={activeTab === "create"}
        icon={GoPlus}
        title="Create"
        address="/profile/create-post"
      />
      <NavComponent
        onClick={() => setActiveTab("about")}
        activeTab={activeTab === "about"}
        icon={IoBookmarkOutline}
        title="About"
        address="/about"
      />
      <NavComponent
        onClick={() => setActiveTab("contact")}
        activeTab={activeTab === "contact"}
        icon={GrContact}
        title="Contact"
        address="/contact"
      />
      <Link
        href={`/profile/${user?._id}`}
        onClick={() => setActiveTab("profile")}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
        ${
          activeTab === "profile"
            ? "font-bold text-black bg-gray-100"
            : "text-gray-700 hover:bg-gray-50"
        }
      `}
      >
        {currentUserInfo?.data?.profilePhoto ? (
          <img
            src={currentUserInfo.data.profilePhoto}
            alt="Profile"
            className="size-[40px] rounded-full object-cover"
          />
        ) : (
          <LuUserRound size={40} className="text-gray-500" />
        )}

        <p className="text-sm">Profile</p>
      </Link>
      {/* <Link className="flex items-center" href={`/profile/${user?._id}`}> */}
      {/* <div>
          <img
            alt=""
            className="size-[40px] rounded-full mr-2"
            src={user?.profilePhoto}
          />
        </div> */}
      {/* <p className="font-bold mr-1 text-medium">{user?.name}</p>
        {user?.isVerified === true && (
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
        )} */}

      {/* <p className="ml-2 font-extralight ">1d</p> */}
      {/* </Link> */}
    </div>
  );
};

export default LeftSection;
