/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from "react";
import { Button } from "@nextui-org/button";

const FollowerCard = ({
  item,
  status,
  removeFollower,
}: {
  item: Record<string, any>;
  status: string;
  removeFollower: (followerId: string) => void;
}) => {
  console.log("card", item);
  const { _id, profilePhoto, name } = item;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <section className="flex items-center gap-4">
          <div>
            <img
              alt="Follower"
              className="rounded-full size-[50px]"
              src={profilePhoto}
            />
          </div>
          <div>{name}</div>
        </section>
        <section>
          <Button>
            <span onClick={() => removeFollower(_id)}>
              {status === "follower" ? "Remove" : "Following"}
            </span>
          </Button>
        </section>
      </div>
    </div>
  );
};

export default FollowerCard;
