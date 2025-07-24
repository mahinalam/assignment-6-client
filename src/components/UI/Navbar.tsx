'use client';

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { siteConfig } from '@/src/config/site';
import { useUser } from '@/src/context/user.provider';
import { Logo } from '@/src/assests/icons';
import { AiOutlineHome } from 'react-icons/ai';
import { GoMoveToTop, GoPlus } from 'react-icons/go';
import { GrContact } from 'react-icons/gr';
import { IoBookmarkOutline } from 'react-icons/io5';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import NavComponent from './NavComponent';
import { useState } from 'react';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useGetSingleUser, useVerifyUserProfile } from '@/src/hooks/auth.hook';
import { LuUserRound } from 'react-icons/lu';
import { logout } from '@/src/services/AuthService';
import { toast } from 'sonner';
import VerificationModal from '../modal/VerificationModal';
import { useDisclosure } from '@nextui-org/modal';
import { useQueryClient } from '@tanstack/react-query';

export const Navbar = () => {
  const { user, isLoading, setIsLoading, setUser } = useUser();
  const [activeTab, setActiveTab] = useState('home');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const {
    isOpen: isVerificationModalOpen,
    onOpen: onVerificationModalOpen,
    onOpenChange: onVerificationModalOpenChange,
  } = useDisclosure();
  const [verifyLoading, setVerifyLoading] = useState(false);
  const {
    mutate: verifyProfile,
    isSuccess,
    isError,
  } = useVerifyUserProfile(user?._id as string);

  const { data: currentUserInfo } = useGetSingleUser(user?._id as string);
  const queryClient = useQueryClient();
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  const handleLogout = async () => {
    setIsLoading(true);

    await logout();
    setUser(null);
    toast.success(`${user?.name} logged out successfully!`);
    router.push('/login');
  };

  const handleVerifyProfile = async () => {
    setVerifyLoading(true);
    await verifyProfile();
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['USER', user?._id, 'PAYMENT'],
      });
      setVerifyLoading(false);
      onVerificationModalOpenChange();
    }
    if (isError) {
      setVerifyLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = (e.target as any).search.value;
    router.push(`/?search=${encodeURIComponent(data)}`);
  };

  return (
    <div className="fixed right-0 left-0 pb-5 z-40 bg-white shadow-md">
      <NextUINavbar maxWidth="xl" className="">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo />
              <p className="font-bold text-inherit">GreenHaven</p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
          <div
            onClick={() => setIsOpen((val) => !val)}
            className="relative cursor-pointer"
          >
            {currentUserInfo?.data?.profilePhoto ? (
              <img
                alt=""
                className="size-[30px] rounded-full "
                src={currentUserInfo?.data?.profilePhoto}
              />
            ) : (
              <LuUserRound size={30} />
            )}
          </div>
          {isOpen && (
            <div className="absolute  z-50  bg-white rounded-xl shadow-md w-[40vw] md:w-[10vw]  overflow-hidden  top-14 text-sm">
              <div className="flex flex-col pl-4 cursor-pointer">
                <>
                  {user?.role === 'USER' ? (
                    <>
                      {' '}
                      <Link
                        className=" text-black text-sm py-2 hover:bg-neutral-100 transition font-semibold"
                        href={`/profile/${user?._id}`}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/dashboard"
                        className=" text-black text-sm py-2 hover:bg-neutral-100 transition font-semibold"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/user/wishlist"
                        className=" text-black text-sm py-2 hover:bg-neutral-100 transition font-semibold"
                      >
                        Saved Post
                      </Link>
                      {!currentUserInfo?.data?.isVerified && (
                        <span
                          onClick={onVerificationModalOpen}
                          className=" text-black text-sm py-2 hover:bg-neutral-100 transition font-semibold"
                        >
                          Premium Subscription
                        </span>
                      )}
                      <span
                        className=" text-red-500 text-sm py-2 hover:bg-neutral-100 transition font-semibold"
                        onClick={handleLogout}
                      >
                        Logout
                      </span>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/profile/edit-profile"
                        className=" text-black text-sm py-2 hover:bg-neutral-100 transition font-semibold"
                      >
                        Profile
                      </Link>

                      <Link
                        href="/dashboard"
                        className=" text-black text-sm py-2 hover:bg-neutral-100 transition font-semibold"
                      >
                        Dashboard
                      </Link>

                      <span
                        className=" text-red-500 text-sm py-2 hover:bg-neutral-100 transition font-semibold"
                        onClick={handleLogout}
                      >
                        Logout
                      </span>
                    </>
                  )}
                </>
              </div>
            </div>
          )}

          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          <div className="mx-4 mt-16 flex flex-col gap-2">
            <NavComponent
              onClick={() => setActiveTab('home')}
              icon={AiOutlineHome}
              activeTab={activeTab === 'home'}
              address="/"
              title="Home"
            />

            <NavComponent
              onClick={() => setActiveTab('blogs')}
              icon={MdOutlineTipsAndUpdates}
              activeTab={activeTab === 'blogs'}
              address="/blogs"
              title="Blogs"
            />

            <NavComponent
              onClick={() => setActiveTab('gardeners')}
              icon={GoMoveToTop}
              activeTab={activeTab === 'gardeners'}
              address="/top-gardeners"
              title="Top Gardeners"
            />

            <NavComponent
              onClick={() => setActiveTab('about')}
              icon={IoBookmarkOutline}
              activeTab={activeTab === 'about'}
              address="/about"
              title="About"
            />

            <NavComponent
              onClick={() => setActiveTab('contact')}
              icon={GrContact}
              activeTab={activeTab === 'contact'}
              address="/contact"
              title="Contact"
            />
          </div>
        </NavbarMenu>
      </NextUINavbar>
      <form onSubmit={handleSearch}>
        <div className="flex lg:hidden items-center  px-6">
          <Input
            size="sm"
            type="text"
            placeholder="Search Posts"
            name="search"
            endContent={
              <Button size="sm" color="primary" type="submit">
                Search
              </Button>
            }
          />
        </div>
      </form>
      <VerificationModal
        isOpen={isVerificationModalOpen}
        onOpenChange={onVerificationModalOpenChange}
        handleVerifyProfile={handleVerifyProfile}
        loading={verifyLoading}
      />
    </div>
  );
};
