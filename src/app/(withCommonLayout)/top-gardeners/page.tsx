'use client';

import TopGardenersSkeleton from '@/src/components/loading-skeleton/TopGardenersSkeleton';
import { useGetAllUsers } from '@/src/hooks/auth.hook';
import { useGetTopGardeners } from '@/src/hooks/post.hook';
import { IPost, IUser } from '@/src/types';
import { Card, CardBody, CardHeader, Avatar, Button } from '@nextui-org/react';
import { StarIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function TopGardenersPage() {
  const { data: topGardeners, isLoading } = useGetTopGardeners();

  if (isLoading) {
    return <TopGardenersSkeleton />;
  }

  return (
    <main className="min-h-screen bg-[#f7fefc] dark:bg-gray-950 py-16 px-6 lg:px-20 mt-[106px] lg:mt-0">
      <section className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="text-4xl font-extrabold text-green-800 dark:text-green-300">
          🌿 Top Gardeners of the Season
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
          Explore the most inspiring and dedicated gardeners on our platform.
          Learn from their creations and connect with nature.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {topGardeners?.data?.map((post: IPost) => {
          const gardener = post?.user as IUser;
          return (
            <Card
              key={post?._id}
              className="shadow-md border border-gray-200 dark:border-gray-800 transition-transform hover:-translate-y-1 hover:shadow-xl"
              isHoverable
            >
              <CardHeader className="flex items-center gap-4">
                <Avatar src={gardener?.profilePhoto} size="lg" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {gardener?.name}
                  </h3>
                  <p className="text-sm text-gray-500">{gardener?.email}</p>
                </div>
              </CardHeader>
              <CardBody className="px-6 pb-6 pt-2">
                <div className="flex justify-between items-center">
                  <Link href={`/profile/${gardener?._id}`}>
                    <Button color="primary" radius="full" size="sm">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </section>

      <section className="mt-24 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">
          Do you want to become a Top Gardener?
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Share your beautiful garden or blog today and get featured on our Top
          Gardeners list!
        </p>
        <Link href="/profile/create-post">
          <Button
            color="success"
            variant="shadow"
            className="mt-6 px-6 py-3 text-white font-medium text-lg"
          >
            Create a Post
          </Button>
        </Link>
      </section>
    </main>
  );
}
