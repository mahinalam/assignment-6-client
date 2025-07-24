'use client';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import {
  useCreateTopGardener,
  useDeleteUser,
  useGetAllUsers,
  useRemoveTopGardener,
} from '@/src/hooks/auth.hook';
import { LuUserRound } from 'react-icons/lu';
import { IUser } from '@/src/types';
import { toast } from 'sonner';
import DeleteModal from '@/src/components/modal/DeleteModal';
import PaginationHelper from '@/src/components/sharred/paginationHelper';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { GoMoveToTop } from 'react-icons/go';
import ManageUsersSkeleton from '@/src/components/loading-skeleton/MangaeUsersSkeleton';
import DashboardContainer from '@/src/components/DashboardContainer';

const ManageUsers = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: allUsers, isLoading } = useGetAllUsers({ page, limit });
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [topGardenerId, setTopGardenerId] = useState<{
    id: null | string;
    name: string | null;
  } | null>({ id: null, name: null });

  const [topGardenerRemoveId, setTopGardenerRemoveId] = useState<{
    id: null | string;
    name: string | null;
  } | null>({ id: null, name: null });

  const { mutate: deleteUser } = useDeleteUser();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isRemoveModalOpen,
    onOpen: onRemoveModalOpen,
    onOpenChange: onRemoveModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isTopGardenerModalOpen,
    onOpen: onTopGardenerModalOpen,
    onOpenChange: onTopGardenerModalOpenChange,
  } = useDisclosure();

  const { mutate: createTopGardener } = useCreateTopGardener();
  const { mutate: removeTopGardener } = useRemoveTopGardener();

  if (isLoading) {
    return <ManageUsersSkeleton />;
  }

  const totalProducts = allUsers?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  // delete modal open
  const handleDeleteModalOpen = (id: string) => {
    setDeleteModalId(id);
    onDeleteModalOpen();
  };

  // top gardener modal open
  const handleTopGardenerModalOpen = (id: string, name: string) => {
    setTopGardenerId({ id, name });
    onTopGardenerModalOpen();
  };

  // top removegardener modal open
  const handleTopGardenerRemoveModalOpen = (id: string, name: string) => {
    setTopGardenerRemoveId({ id, name });
    onRemoveModalOpen();
  };

  const handleMakeTopGardener = async () => {
    const id = toast.loading('Promoting to Top Gardener...');
    if (topGardenerId?.id) {
      await createTopGardener(
        { userId: topGardenerId.id },
        {
          onSuccess: () => {
            toast.success(`${topGardenerId.name} marked as top gardener`, {
              id,
            });
            queryClient.invalidateQueries({ queryKey: ['USER'] });
          },
          onError: () => {
            toast.error(
              'Failed to promote user to Top Gardener. Please try again.',
              { id }
            );
          },
        }
      );
    }
  };

  // remove top gardener
  const handleRemoveTopGardener = async () => {
    const id = toast.loading('Removing from Top Gardeners...');
    if (topGardenerRemoveId?.id) {
      await removeTopGardener(topGardenerRemoveId.id, {
        onSuccess: () => {
          toast.success(
            `${topGardenerRemoveId.name} has been removed from Top Gardeners successfully.`,
            {
              id,
            }
          );
          queryClient.invalidateQueries({ queryKey: ['USER'] });
        },
        onError: () => {
          toast.error(
            'Failed to remove Top Gardener. Please try again later.',
            { id }
          );
        },
      });
    }
  };

  // delete user fn
  const handleDeleteUser = async () => {
    const id = toast.loading('Deleting user...');
    if (deleteModalId) {
      await deleteUser(deleteModalId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['USER'] });
          toast.success('Successfully deleted user.', { id });
        },
        onError: () => {
          toast.error('Failed to deleted user.', { id });
        },
      });
    }
  };

  // all users
  const topGardeners = allUsers?.data?.data?.filter(
    (user: IUser) => user.isTopGardener
  );
  return (
    <DashboardContainer>
      {/* top gardeners */}
      <div className="md:my-">
        <h1 className="text-2xl font-medium pt-6 pb-5 lg:pt-8 mt-4">
          Top Gardeners
        </h1>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>USER</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>MOBILE NUMBER</TableColumn>
          <TableColumn>VERIFIED STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            topGardeners?.map((item: IUser) => (
              <TableRow key={item?._id}>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {item?.profilePhoto ? (
                      <>
                        <img
                          src={item?.profilePhoto}
                          alt="Profile"
                          className="size-[40px] rounded-full object-cover"
                        />
                      </>
                    ) : (
                      <>
                        <LuUserRound size={40} className="text-gray-500" />
                      </>
                    )}
                    <div>
                      <p>{item.name}</p>
                      <p>{item?.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item?.role}</TableCell>
                <TableCell>{item?.mobileNumber}</TableCell>

                <TableCell>
                  <button
                    className={`px-3 py-1 text-white text-sm font-medium rounded-xl ${
                      item?.isVerified ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {item?.isVerified ? 'Verified' : 'Unverified'}
                  </button>
                </TableCell>

                <TableCell>
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <BiDotsVerticalRounded size={20} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Product Actions">
                      <DropdownItem
                        key={item._id}
                        onClick={() =>
                          handleTopGardenerRemoveModalOpen(item._id, item.name)
                        }
                      >
                        <span className="flex items-center gap-1">
                          <span>
                            <IoIosRemoveCircleOutline size={20} />
                          </span>
                          <span>Remove</span>
                        </span>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <PaginationHelper page={page} setPage={setPage} totalPages={totalPages} />

      {/* all users */}
      <div className="md:my-">
        <h1 className="text-2xl font-medium pt-6 pb-5 lg:pt-8 mt-4">
          All Users
        </h1>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>USER</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>MOBILE NUMBER</TableColumn>
          <TableColumn>VERIFIED STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            allUsers?.data?.data?.map((item: IUser) => (
              <TableRow key={item?._id}>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {item?.profilePhoto ? (
                      <>
                        <img
                          src={item?.profilePhoto}
                          alt="Profile"
                          className="size-[40px] rounded-full object-cover"
                        />
                      </>
                    ) : (
                      <>
                        <LuUserRound size={40} className="text-gray-500" />
                      </>
                    )}
                    <div>
                      <p>{item.name}</p>
                      <p>{item?.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item?.role}</TableCell>
                <TableCell>{item?.mobileNumber}</TableCell>

                <TableCell>
                  <button
                    className={`px-3 py-1 text-white text-sm font-medium rounded-xl ${
                      item?.isVerified ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {item?.isVerified ? 'Verified' : 'Unverified'}
                  </button>
                </TableCell>
                <TableCell>
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <BiDotsVerticalRounded size={20} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Product Actions">
                      <DropdownItem key={item._id}>
                        <button
                          onClick={() => {
                            if (item.isTopGardener) return; // ✅ Do not open modal
                            handleTopGardenerModalOpen(item._id, item.name);
                          }}
                          disabled={item.isTopGardener}
                          className="flex items-center gap-1 disabled:cursor-not-allowed"
                        >
                          <GoMoveToTop size={20} />
                          <span>Top Gardener</span>
                        </button>
                      </DropdownItem>
                      <DropdownItem
                        key={item._id}
                        onClick={() => handleDeleteModalOpen(item._id)}
                      >
                        <span className="flex items-center gap-1">
                          <span>
                            <RiDeleteBin5Line size={20} />
                          </span>
                          <span>Delete</span>
                        </span>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <PaginationHelper page={page} setPage={setPage} totalPages={totalPages} />
      <DeleteModal
        title="Delete User"
        subTitle="Are you sure want to delete this user?"
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalOpenChange}
        handleDeleteProduct={handleDeleteUser}
      />
      <DeleteModal
        title="Make Top Gardener"
        subTitle={`Are you sure you want to mark ${topGardenerId?.name} as a Top Gardener?`}
        isOpen={isTopGardenerModalOpen}
        onOpenChange={onTopGardenerModalOpenChange}
        handleDeleteProduct={handleMakeTopGardener}
      />
      <DeleteModal
        title="Remove Top Gardener"
        subTitle={`Are you sure you want to remove ${topGardenerRemoveId?.name} from Top Gardener?`}
        isOpen={isRemoveModalOpen}
        onOpenChange={onRemoveModalOpenChange}
        handleDeleteProduct={handleRemoveTopGardener}
      />
    </DashboardContainer>
  );
};

export default ManageUsers;
