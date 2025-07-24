import Sidebar from '@/src/components/dashboard/Sidebar';
import { getCurrentUser } from '@/src/services/AuthService';
import {
  FileTextIcon,
  HomeIcon,
  PawPrint,
  SettingsIcon,
  UserIcon,
  SaveIcon,
} from 'lucide-react';
import React from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { AiOutlineDollar } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { TbUsers } from 'react-icons/tb';

export default async function userDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { _id, role }: any = await getCurrentUser();
  // const {} =
  const userMenuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <HomeIcon size={25} />,
      href: '/dashboard',
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: <CgProfile size={25} />,
      href: `/profile/${_id}`,
    },
    {
      key: 'contents',
      label: 'Contents',
      icon: <FileTextIcon size={25} />,
      children: [
        {
          key: 'all-posts',
          label: 'All Posts',
          href: '/dashboard/user/posts',
        },
        {
          key: 'all-blogs',
          label: 'All Blogs',
          href: '/dashboard/user/blogs',
        },
      ],
    },
    {
      key: 'saved-posts',
      label: 'Saved Posts',
      icon: <SaveIcon size={25} />,
      href: '/dashboard/user/wishlist',
    },
  ];
  const adminMenuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <HomeIcon size={25} />,
      href: '/dashboard',
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: <CgProfile size={25} />,
      href: role === 'USER' ? `/profile/${_id}` : '/profile/edit-profile',
    },
    {
      key: 'users',
      label: 'Users',
      icon: <TbUsers size={25} />,
      href: '/dashboard/admin/manage-users',
    },
    {
      key: 'contents',
      label: 'Contents',
      icon: <FileTextIcon size={25} />,
      children: [
        {
          key: 'all-posts',
          label: 'All Posts',
          href: '/dashboard/admin/manage-posts',
        },
        {
          key: 'all-blogs',
          label: 'All Blogs',
          href: '/dashboard/admin/manage-blogs',
        },
      ],
    },
    {
      key: 'categories',
      label: 'Categories',
      icon: <BiCategoryAlt size={25} />,
      href: '/dashboard/admin/manage-categories',
    },
    {
      key: 'payments',
      label: 'Payments',
      icon: <AiOutlineDollar size={25} />,
      href: '/dashboard/admin/manage-payments',
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
      {role === 'USER' ? (
        <Sidebar menuItems={userMenuItems} />
      ) : (
        <Sidebar menuItems={adminMenuItems} />
      )}

      <main className="flex-grow p-4 md:p-8 md:ml-72 lg:ml-80 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
