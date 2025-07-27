import { Card, CardBody, Skeleton } from "@nextui-org/react";
import React from "react";

const ProfileVerificationFailedSkeleton = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <Card className="w-full max-w-xl p-6">
        <CardBody>
          <Skeleton className="h-8 w-3/4 mb-4 rounded-lg" />
          <Skeleton className="h-4 w-full mb-2 rounded-lg" />
          <Skeleton className="h-4 w-5/6 mb-4 rounded-lg" />
          <Skeleton className="h-10 w-1/2 rounded-lg" />
          <Skeleton className="h-4 w-1/3 mt-4 rounded-lg" />
        </CardBody>
      </Card>
    </main>
  );
};

export default ProfileVerificationFailedSkeleton;
