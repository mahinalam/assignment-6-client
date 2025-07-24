import React from 'react';

const PostsNotFound = () => {
  return (
    <div className="lg:w-[90%] lg:mx-auto lg:min-h-screen min-h-[80vh] flex flex-col justify-center items-center bg-gray-50 px-4">
      <h1 className="text-6xl font-bold text-gray-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        No Posts Found
      </h2>
      <p className="text-gray-600 mb-6 max-w-md text-center">
        Sorry, we couldn’t find any posts matching your criteria. Try adjusting
        your search or come back later.
      </p>
      <a
        href="/"
        className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
      >
        Go to Home
      </a>
    </div>
  );
};

export default PostsNotFound;
