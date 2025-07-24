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
import PaginationHelper from '@/src/components/sharred/paginationHelper';
import DashboardContainer from '../DashboardContainer';

const ManageBlogsSkeleton = () => {
  const limit = 5;

  return (
    <DashboardContainer>
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-[200px] rounded-lg mt-6" />
        <Skeleton className="h-10 w-[130px] rounded-md mt-6" />
      </div>

      <Table aria-label="Loading table" className="w-full mt-4">
        <TableHeader>
          <TableColumn>
            <Skeleton className="h-4 w-20 rounded-md" />
          </TableColumn>
          <TableColumn>
            <Skeleton className="h-4 w-32 rounded-md" />
          </TableColumn>
          <TableColumn>
            <Skeleton className="h-4 w-16 rounded-md" />
          </TableColumn>
        </TableHeader>
        <TableBody>
          {Array.from({ length: limit }).map((_, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Skeleton className="h-4 w-24 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-28 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-16 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4">
        <PaginationHelper page={1} setPage={() => {}} totalPages={1} />
      </div>
    </DashboardContainer>
  );
};

export default ManageBlogsSkeleton;
