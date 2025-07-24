'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from '@nextui-org/react';
import DashboardContainer from '../DashboardContainer';

const PaymentSkeleton = () => {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <DashboardContainer>
      <h1 className="text-2xl font-medium pt-6 pb-5 lg:pt-8 mt-4">
        All Payments
      </h1>
      <Table aria-label="Payment skeleton loading table" className="w-full">
        <TableHeader>
          <TableColumn>USER</TableColumn>
          <TableColumn>TRANSACTION ID</TableColumn>
          <TableColumn>TOTAL PRICE</TableColumn>
          <TableColumn>CURRENCY</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>TRANSACTION DATE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {skeletonRows.map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="h-4 w-[120px] rounded-md" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[140px] rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[60px] rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[50px] rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[80px] rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px] rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-[60px] rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardContainer>
  );
};

export default PaymentSkeleton;
