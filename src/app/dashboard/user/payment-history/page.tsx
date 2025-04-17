"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { useUser } from "@/src/context/user.provider";
import { useGetAllUserPayments } from "@/src/hooks/payment.hook";
import Loading from "@/src/components/UI/Loading";
import moment from "moment";

const MyPosts = () => {
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: paymentData, isLoading: paymentDataLoading } =
    useGetAllUserPayments(user?._id as string);
  console.log("paymentData", paymentData);

  if (paymentDataLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <div className="md:my-">
        <h1 className="text-2xl font-medium md:pl-6 md:my-3">
          Payment History
        </h1>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>EMAIL </TableColumn>
          <TableColumn>DATE </TableColumn>
          <TableColumn>TRANS. ID</TableColumn>
          <TableColumn>PAYMENT STATUS</TableColumn>
          <TableColumn>TOTAL PRICE </TableColumn>
          <TableColumn>CURRENCY</TableColumn>
        </TableHeader>
        <TableBody>
          {!paymentDataLoading &&
            paymentData?.data?.map((item: any) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.userId?.email}</TableCell>
                <TableCell>
                  {" "}
                  {item?.createdAt
                    ? moment(item.createdAt).format("MMMM D YYYY")
                    : ""}
                </TableCell>
                <TableCell>{item?.transactionId}</TableCell>
                <TableCell>
                  <span
                    className={`${item.paymentStatus === "paid" ? "text-green-500" : "text-red-500"} font-bold`}
                  >
                    {item?.paymentStatus}
                  </span>
                </TableCell>
                <TableCell>{item?.totalPrice}</TableCell>
                <TableCell>{item?.currency}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyPosts;
