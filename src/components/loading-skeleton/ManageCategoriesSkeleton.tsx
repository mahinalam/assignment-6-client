'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from '@nextui-org/react';
import React from 'react';
import DashboardContainer from '../DashboardContainer';

const ManageCategoriesSkeleton = () => {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <DashboardContainer>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium pt-6 pb-5 lg:pt-8 mt-4">
          <Skeleton className="h-6 w-48 rounded-lg" />
        </h1>
        <div>
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
      </div>

      <Table aria-label="Loading categories table" className="w-full">
        <TableHeader>
          <TableColumn>
            <Skeleton className="h-4 w-20 rounded" />
          </TableColumn>
          <TableColumn>
            <Skeleton className="h-4 w-32 rounded" />
          </TableColumn>
          <TableColumn>
            <Skeleton className="h-4 w-16 rounded" />
          </TableColumn>
        </TableHeader>

        <TableBody>
          {skeletonRows.map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-32 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-20 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardContainer>
  );
};

export default ManageCategoriesSkeleton;
