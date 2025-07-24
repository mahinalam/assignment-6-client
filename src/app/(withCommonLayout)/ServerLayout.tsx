// components/layout/ServerLayout.tsx
import { Suspense } from 'react';
import { Navbar } from '@/src/components/UI/Navbar';
import LeftSection from '@/src/components/sharred/LeftSection';
import SkeletonLoading from '@/src/components/UI/SkeletonLoading';
import LeftSectionSkeleton from '@/src/components/UI/LeftSkeleton';
import { notFound } from 'next/navigation';
import { getPathname } from '@/src/components/sharred/getPathname';

export default async function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = await getPathname();

  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <div>
      {!isAuthPage && (
        <div className="block lg:hidden">
          <Suspense fallback={<SkeletonLoading />}>
            <Navbar />
          </Suspense>
        </div>
      )}
      <div className="flex p-5">
        {!isAuthPage && (
          <div className="w-2/12 lg:block hidden">
            <Suspense fallback={<LeftSectionSkeleton />}>
              <LeftSection />
            </Suspense>
          </div>
        )}
        <div
          className={
            isAuthPage
              ? 'w-full flex justify-center'
              : 'lg:w-10/12 w-full lg:ml-auto'
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
