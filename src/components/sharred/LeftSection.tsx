"use client";

import React from "react";
import NavComponent from "./NavComponent";
import { IoMdHome } from "react-icons/io";
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

const LeftSection = () => {
  const { user } = useUser();
  const { data: currentUserInfo } = useGetSingleUser();

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
      <NavComponent icon={<IoMdHome size={30} />} address="/" title="Home" />
      <NavComponent
        icon={<MdOutlineTipsAndUpdates size={30} />}
        title="Blogs"
        address="/blogs"
      />
      <NavComponent
        icon={<GoPlus size={30} />}
        title="Create"
        address="/profile/create-post"
      />
      <NavComponent
        icon={<IoBookmarkOutline size={30} />}
        title="About"
        address="/about"
      />
      <NavComponent
        icon={<GrContact size={30} />}
        title="Contact"
        address="/contact"
      />
      <Link className="flex items-center" href={`/profile/${user?._id}`}>
        <div>
          <img
            alt=""
            className="size-[40px] rounded-full mr-2"
            src={currentUserInfo?.data?.profilePhoto}
          />
        </div>
        <p className="font-bold mr-1 text-medium">{user?.name}</p>
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
        )}

        {/* <p className="ml-2 font-extralight ">1d</p> */}
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
