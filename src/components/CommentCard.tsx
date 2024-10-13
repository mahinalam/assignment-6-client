/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
"use client";

import React from "react";
import { useRouter } from "next/navigation";

const CommentCard = ({ comment }: any) => {
  const { content, user, createdAt, post } = comment;

  console.log(comment);
  const router = useRouter();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="cursor-pointer"
      onClick={() => router.push(`/profile/${user?._id}`)}
    >
      <div className="">
        <div className="my-5">
          <div className="flex  gap-5">
            <div>
              <img
                alt=""
                className="size-[50px] rounded-full"
                src={user?.profilePhoto}
              />
            </div>
            <div>
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <p>{user?.name}</p>
                  <p>{content}</p>
                </div>
                <p className="font-extralight">{createdAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
