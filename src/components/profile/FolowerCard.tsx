/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import { Button } from '@nextui-org/button';

const FollowerCard = ({
  item,
  status,
  handleRemoveFollower,
  handleUnfollowUser,
  handleUnfollowFollowingUserModalOpen,
}: {
  item: Record<string, any>;
  status: 'follower' | 'following';
  handleRemoveFollower?: any;
  isFollowing: boolean;
  isOwnProfile: any;
  handleUnfollowUser?: any;
  handleUnfollowFollowingUserModalOpen?: any;
}) => {
  return (
    <>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <section className="flex items-center gap-4">
            <div>
              <img
                alt="Follower"
                className="rounded-full size-[50px]"
                src={
                  status === 'following'
                    ? item?.following?.profilePhoto
                    : item?.follower?.profilePhoto
                }
              />
            </div>
            <div>
              {status === 'following'
                ? item?.following?.name
                : item?.follower?.name}
            </div>
          </section>
          <section>
            {status === 'following' ? (
              <Button
                size="sm"
                onClick={() =>
                  handleUnfollowFollowingUserModalOpen(
                    item?.following?._id,
                    item?.following?.name
                  )
                }
              >
                <span>Following</span>
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => handleRemoveFollower(item?.follower?._id)}
              >
                <span>Remove</span>
              </Button>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default FollowerCard;
