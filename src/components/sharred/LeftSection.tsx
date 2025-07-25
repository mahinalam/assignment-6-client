"use client";

import React, { useState, useEffect } from "react";
import NavComponent from "./NavComponent";

import Link from "next/link";
import { useUser } from "@/src/context/user.provider";
import { Input } from "@nextui-org/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Spinner from "./Spiner"; // your spinner component
import { useGetSingleUser, useVerifyUserProfile } from "@/src/hooks/auth.hook";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { LuUserRound } from "react-icons/lu";
import { GrContact } from "react-icons/gr";
import { toast } from "sonner";
import { logout } from "@/src/services/AuthService";
import VerificationModal from "../modal/VerificationModal";
import { useDisclosure } from "@nextui-org/modal";
import { GoMoveToTop } from "react-icons/go";
import { useQueryClient } from "@tanstack/react-query";
import LeftSectionSkeleton from "../UI/LeftSkeleton";

const LeftSection = () => {
  const { user, setIsLoading, setUser } = useUser();
  const { data: currentUserInfo } = useGetSingleUser(user?._id as string);
  const [activeTab, setActiveTab] = useState("home");
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const {
    isOpen: isVerificationModalOpen,
    onOpen: onVerificationModalOpen,
    onOpenChange: onVerificationModalOpenChange,
  } = useDisclosure();

  const {
    mutate: verifyProfile,
    isSuccess,
    isError,
  } = useVerifyUserProfile(user?._id as string);

  const { data: currentUserData, isLoading: leftSectionLoading } =
    useGetSingleUser(user?._id as string);

  const queryClient = useQueryClient();
  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (searchValue.trim()) {
      current.set("search", searchValue.trim());
    } else {
      current.delete("search");
    }

    const query = current.toString();

    // ✅ Stay on the current page, just update the query string
    router.push(query ? `${pathname}?${query}` : pathname);
  }, [searchValue]);
  const isLoginOrSignUp = pathname === "/login" || pathname === "/register";

  // Clear search handler (optional: guard pathname here too)
  const clearSearch = () => {
    setSearchValue("");
    if (pathname === "/") {
      router.push("/");
    }
  };
  const handleLogout = async () => {
    setIsLoading(true);

    await logout();
    setUser(null);
    toast.success(`${user?.name} logged out successfully!`);
    router.push("/login");
  };

  // verify profile
  const handleVerifyProfile = async () => {
    setVerifyLoading(true);
    await verifyProfile();
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["USER", user?._id, "PAYMENT"],
      });
      setVerifyLoading(false);
      onVerificationModalOpenChange();
    }
    if (isError) {
      setVerifyLoading(false);
    }
  };
  return (
    <>
      <div
        className={`${
          isLoginOrSignUp
            ? "hidden"
            : "block xl:w-2/12 lg:w-3/12 border-r-2 fixed p-5 inset-0"
        }`}
      >
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="rounded mb-3 w-full ml-auto placeholder:text-green-600"
          size="lg"
          startContent={<CiSearch size={20} />}
          endContent={
            isSearching ? (
              <Spinner />
            ) : searchValue ? (
              <RiCloseLine
                size={20}
                className="cursor-pointer text-gray-500 hover:text-black"
                onClick={clearSearch}
              />
            ) : null
          }
        />

        <div className="!py-7 px-3 ">
          <Link className="font-bold italic" href="/">
            GreenHaven
          </Link>
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
          onClick={() => setActiveTab("gardeners")}
          activeTab={activeTab === "gardeners"}
          icon={GoMoveToTop}
          title="Top Gardeners"
          address="/top-gardeners"
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
        <NavComponent
          onClick={() => setActiveTab("create")}
          activeTab={activeTab === "create"}
          icon={GoPlus}
          title="Create"
          address="/profile/create-post"
        />

        <div className="relative cursor-pointer px-4 py-4">
          {" "}
          <div
            onClick={() => setIsOpen((val) => !val)}
            className="flex gap-2 items-center "
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
              <p className="text-subTitle ">{currentUserInfo?.data?.name}</p>
            </div>

            {/* <p className="ml-2 font-extralight ">1d</p> */}
          </div>
          {isOpen && (
            <div className="absolute  z-50  bg-white rounded-xl shadow-md w-[40vw] md:w-[10vw]  overflow-hidden  top-14 text-sm">
              <div className="flex flex-col pl-4 cursor-pointer">
                <>
                  {user?.role === "USER" ? (
                    <>
                      {" "}
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
                      {!currentUserData?.data?.isVerified && (
                        <Link
                          onClick={onVerificationModalOpen}
                          href="/"
                          className=" text-black -4 py-2 hover:bg-neutral-100 transition font-semibold"
                        >
                          Premium Subscription
                        </Link>
                      )}
                      <span
                        className=" text-red-500  py-2 hover:bg-neutral-100 transition font-semibold"
                        onClick={handleLogout}
                      >
                        Logout
                      </span>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/profile/edit-profile"
                        className=" text-black -4 py-2 hover:bg-neutral-100 transition font-semibold"
                      >
                        Profile
                      </Link>

                      <Link
                        href="/dashboard"
                        className=" text-black -4 py-2 hover:bg-neutral-100 transition font-semibold"
                      >
                        Dashboard
                      </Link>

                      <span
                        className=" text-red-500  py-2 hover:bg-neutral-100 transition font-semibold"
                        onClick={handleLogout}
                      >
                        Logout
                      </span>
                    </>
                  )}
                </>
              </div>
            </div>
          )}
        </div>
      </div>
      <VerificationModal
        isOpen={isVerificationModalOpen}
        onOpenChange={onVerificationModalOpenChange}
        handleVerifyProfile={handleVerifyProfile}
        loading={verifyLoading}
      />
    </>
  );
};

export default LeftSection;
