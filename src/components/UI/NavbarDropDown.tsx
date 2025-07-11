"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";

import { logout } from "@/src/services/AuthService";
import { useUser } from "@/src/context/user.provider";
// import { protectedRoutes } from "@/src/constant";

export default function NavbarDropdown() {
  const router = useRouter();
  const { user, setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Dropdown>
      {/* <DropdownTrigger> */}
      <Avatar className="cursor-pointer" src={user?.profilePhoto} />
      {/* </DropdownTrigger> */}
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key={1}
          // onClick={() => handleNavigation(`/profile/${user?._id}`)}
        >
          Profile
        </DropdownItem>
        <DropdownItem
          key={2}
          // onClick={() => handleNavigation("/profile/create-post")}
        >
          Create Post
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={() => handleLogout()}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
