'use client';
import Link from 'next/link';
import React from 'react';

const Button = () => {
  return (
    <div>
      {' '}
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
      >
        Join GardenSocial
      </Link>
    </div>
  );
};

export default Button;
