'use client';

import { IPost } from '@/src/types';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import React, { useState } from 'react';
import OverViewCard, { IProps } from '@/src/components/dashboard/OverViewCard';
import { LuUserPlus, LuUserRound } from 'react-icons/lu';
import { useUser } from '@/src/context/user.provider';
import { useGetAllPosts } from '@/src/hooks/post.hook';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useGetPostReacts } from '@/src/hooks/react.hook';
import { useGetSingleUser, useGetUserStats } from '@/src/hooks/auth.hook';
import PaginationHelper from '../sharred/paginationHelper';
import UserDashboardSkeleton from '../loading-skeleton/UserDashboardSkeleton';
import DashboardContainer from '../DashboardContainer';

const UserDashboardHomePageComponent = () => {
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data: userPosts, isLoading } = useGetAllPosts({
    user: user?._id,
    page,
    limit,
  });
  const { data: currentUserInfo } = useGetSingleUser(user?._id as string);
  const { data: userStats } = useGetUserStats();

  if (isLoading) {
    return <UserDashboardSkeleton />;
  }

  const navMenu: IProps[] = [
    {
      title: 'Total Posts',
      icon: MdOutlineTipsAndUpdates,
      style: 'bg-[#DBEAFE]',
      count: userStats?.data?.totalPosts,
    },
    {
      title: 'Saved Posts',
      icon: FaRegHeart,
      style: 'bg-[#FEE2E2]',
      count: userStats?.data?.totalSavedPosts,
    },
    {
      title: 'Total Blogs',
      icon: MdOutlineTipsAndUpdates,
      style: 'bg-[#DCFCE7]',
      count: userStats?.data?.totalBlogs,
    },
    {
      title: 'Total Followers',
      icon: LuUserPlus,
      style: 'bg-[#FEF9C3]',
      count: userStats?.data?.totalFollowers,
    },
  ];

  const totalProducts = userPosts?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <DashboardContainer>
      <p className="text-2xl font-bold pt-6 pb-5 lg:pt-8 mt-4">Overview</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {navMenu.map((item: IProps, index: number) => (
          <OverViewCard
            key={index}
            count={item.count}
            icon={item.icon}
            style={item.style}
            title={item.title}
          />
        ))}
      </div>
      <div>
        <p className="text-2xl font-bold pt-6 lg:pt-8">Recent Posts</p>
        <div>
          {/* {userPosts?.data?.map((post: IPost) => (
            <></>
          ))} */}
          <Table aria-label="Example static collection table" className="mt-4">
            <TableHeader>
              <TableColumn>USER</TableColumn>
              <TableColumn>POST</TableColumn>
              <TableColumn>CATEGORY </TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>CONTENT TYPE</TableColumn>
            </TableHeader>

            <TableBody>
              {userPosts?.data?.data?.map((order: IPost) => (
                <TableRow key={order._id}>
                  <TableCell className="">
                    <div className="flex items-center gap-1">
                      {currentUserInfo?.data?.profilePhoto ? (
                        <>
                          <img
                            src={currentUserInfo.data.profilePhoto}
                            alt="Profile"
                            className="size-[40px] rounded-full object-cover"
                          />
                        </>
                      ) : (
                        <>
                          <LuUserRound size={40} className="text-gray-500" />
                        </>
                      )}
                      <p>{currentUserInfo?.data?.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex  items-center gap-1">
                      <img
                        src={order?.images?.[0]}
                        alt="Profile"
                        className="size-[40px] rounded-full object-cover"
                      />
                      <p>
                        {order?.title?.length > 20
                          ? order?.title.slice(0, 20) + '...'
                          : order?.title}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{order?.category?.name}</TableCell>
                  <TableCell>{order?.status}</TableCell>
                  <TableCell>
                    {order?.isPremium ? 'Premium' : 'General'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginationHelper
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </DashboardContainer>
  );
};

export default UserDashboardHomePageComponent;
