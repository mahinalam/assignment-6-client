import Sidebar from "@/src/components/dashboard/Sidebar";
import { getCurrentUser } from "@/src/services/AuthService";
import {
  FileTextIcon,
  HomeIcon,
  PawPrint,
  SettingsIcon,
  UserIcon,
  SaveIcon,
} from "lucide-react";
import React from "react";

export default async function userDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { _id } = await getCurrentUser();
  // const {} =
  const userMenuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <HomeIcon />,
      href: "/dashboard",
    },
    {
      key: "profile",
      label: "Profile",
      icon: <UserIcon />,
      href: `/profile/${_id}`,
    },
    {
      key: "contents",
      label: "Contents",
      icon: <FileTextIcon />,
      children: [
        {
          key: "all-posts",
          label: "All Posts",
          href: "/dashboard/user/posts",
        },
        {
          key: "all-blogs",
          label: "All Blogs",
          href: "/dashboard/user/blogs",
        },
      ],
    },
    {
      key: "saved-posts",
      label: "Saved Posts",
      icon: <SaveIcon />,
      href: "/dashboard/user/wishlist",
    },
  ];
  return (
    // <div className="flex flex-col md:flex-row min-h-screen md:gap-10">
    //   <div className="mb-10 md:mb-0 ">
    //     <Sidebar menuItems={userMenuItems} />
    //   </div>
    //   <main className="flex-grow ml-[204px] p-4 md:p-8 overflow-auto md:ml-60 lg:ml-28 xl:ml-0">
    //     {children}
    //   </main>
    // </div>
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar menuItems={userMenuItems} />

      <main className="flex-grow p-4 md:p-8 md:ml-72 lg:ml-80 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
