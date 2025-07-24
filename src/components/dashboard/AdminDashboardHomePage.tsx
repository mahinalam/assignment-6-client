'use client';

import { IPayment, IPost } from '@/src/types';
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
import { useGetAllPayments } from '@/src/hooks/payment.hook';
import moment from 'moment';
import PaginationHelper from '../sharred/paginationHelper';
import UserDashboardSkeleton from '../loading-skeleton/UserDashboardSkeleton';
import DashboardContainer from '../DashboardContainer';

const AdminDashboardHomePageComponent = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useGetAllPayments({ page, limit });
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
      title: 'Total Blogs',
      icon: FaRegHeart,
      style: 'bg-[#FEE2E2]',
      count: userStats?.data?.totalBlogs,
    },
    {
      title: 'Total Categories',
      icon: MdOutlineTipsAndUpdates,
      style: 'bg-[#DCFCE7]',
      count: userStats?.data?.totalCategories,
    },
    {
      title: 'Total Payments',
      icon: LuUserPlus,
      style: 'bg-[#FEF9C3]',
      count: userStats?.data?.totalPayments,
    },
  ];

  const totalProducts = data?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <DashboardContainer>
      <p className="text-2xl font-bold pt-6 pb-5 lg:pt-8">Overview</p>
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
      <div className="w-full">
        <div className="md:my-">
          <h1 className="text-2xl font-medium md:pl-6 md:my-3">
            Recent Payments
          </h1>
        </div>
        <Table aria-label="Example static collection table" className="w-full">
          <TableHeader>
            <TableColumn>USER</TableColumn>
            <TableColumn>TRANSACTION ID</TableColumn>
            <TableColumn>TOTAL PRICE</TableColumn>
            <TableColumn>CURRENCY</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>TRANSACTION DATE</TableColumn>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              data?.data?.data?.map((item: IPayment) => (
                <TableRow key={item?._id}>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {item?.userId?.profilePhoto ? (
                        <>
                          <img
                            src={item.userId.profilePhoto}
                            alt="Profile"
                            className="size-[40px] rounded-full object-cover"
                          />
                        </>
                      ) : (
                        <>
                          <LuUserRound size={40} className="text-gray-500" />
                        </>
                      )}
                      <p>{item?.userId?.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{item?.transactionId}</TableCell>
                  <TableCell>{item?.totalPrice}</TableCell>
                  <TableCell>{item?.currency}</TableCell>
                  <TableCell>{item?.paymentStatus}</TableCell>
                  <TableCell>
                    {moment(item.createdAt).format('D MMM YYYY')}
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
    </DashboardContainer>
  );
};

export default AdminDashboardHomePageComponent;
