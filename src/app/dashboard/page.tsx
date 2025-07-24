'use client';

import { useUser } from '@/src/context/user.provider';
import UserDashboardHomePageComponent from '@/src/components/dashboard/UserDashboardHomePage';
import AdminDashboardHomePageComponent from '@/src/components/dashboard/AdminDashboardHomePage';

const DashboardPage = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <>
      {user.role === 'USER' ? (
        <UserDashboardHomePageComponent />
      ) : (
        <AdminDashboardHomePageComponent />
      )}
    </>
  );
};

export default DashboardPage;

// TODO: implement group
// TODO: Implement share post , follow , unfollow on user card
