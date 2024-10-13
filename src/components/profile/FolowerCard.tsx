import React from "react";
import { Button } from "@nextui-org/button";

const FollowerCard = ({
  item,
  status,
}: {
  item: Record<string, any>;
  status: string;
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
          <Button>{status === "follower" ? "Remove" : "Following"}</Button>
        </section>
      </div>
    </div>
  );
};

export default FollowerCard;
