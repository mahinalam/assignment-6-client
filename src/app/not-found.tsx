'use client';

import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { TbError404 } from 'react-icons/tb';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="flex justify-center">
          <TbError404 className="text-primary text-[80px] md:text-[100px]" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Page Not Found
        </h1>
        <p className="text-gray-500 text-base md:text-lg">
          Oops! The page you&apos;re looking for doesn&rsquo;t exist or has been
          moved.
        </p>
        <Link href="/">
          <Button className="mt-4" color="primary" radius="full" size="lg">
            Go Back Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
