/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */

import Link from "next/link";
import React from "react";

const RecentPost = ({ recentPosts }: { recentPosts: any }) => {
  console.log(recentPosts);
  return (
    <div>
      <div className="space-y-2">
        <section>
          <h1 className="text-2xl">Recent Posts</h1>
        </section>
        <section>
          <div className=" font-bold border-1 border-[#E3BE21]" />
        </section>
        <section>
          {recentPosts?.map((recentPost: any) => (
            <div className="flex items-center gap-2">
              <p className="text-[#E3BE21]">{`>`}</p>
              <Link href={`/posts/${recentPost?._id}`}>
                {recentPost?.title}
              </Link>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default RecentPost;
