/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useUser } from '@/src/context/user.provider';
import { logout } from '@/src/services/AuthService';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import Loading from '../UI/Loading';

interface SidebarProps {
  setActiveSection: (section: string) => void;
  activeSection: string;
}

export const UserSidebar: React.FC<SidebarProps> = ({
  setActiveSection,
  activeSection,
}) => {
  const { user, setIsLoading: userLoading } = useUser();

  if (!user) {
    return <Loading />;
  }

  const handleLogout = () => {
    logout();
    userLoading(true);
  };

  return (
    <div className="bg-gray-800 text-white w-[280px] min-h-screen p-6">
      <div className=" flex justify-between items-center h-[50px] gap-4 mb-4">
        <div>
          <Link href="/">
            {' '}
            <h2 className="text-lg font-bold mb-6">Green Haven</h2>
          </Link>
        </div>
        <div onClick={() => handleLogout()}>
          <Button color="default" className=" ">
            Logout
          </Button>
        </div>
      </div>

      <Link
        className={`block w-full text-left p-2 rounded-md mb-2 ${
          activeSection === 'managePosts' ? 'bg-blue-600' : 'bg-transparent'
        }`}
        href="/dashboard/user/my-post"
        onClick={() => setActiveSection('myPosts')}
      >
        My Posts
      </Link>

      <Link
        href="/profile/create-post"
        className={`block w-full text-left p-2 rounded-md mb-2 ${
          activeSection === 'createPost' ? 'bg-blue-600' : 'bg-transparent'
        }`}
        onClick={() => setActiveSection('createPost')}
      >
        Create Post
      </Link>
      <Link
        className={`block w-full text-left p-2 rounded-md mb-2 ${
          activeSection === 'managePosts' ? 'bg-blue-600' : 'bg-transparent'
        }`}
        href={`/profile/${user?._id}`}
        onClick={() => setActiveSection('myPosts')}
      >
        Profile
      </Link>
      {/* <Link
        className={`block w-full text-left p-2 rounded-md mb-2 ${
          activeSection === "manageUsers" ? "bg-blue-600" : "bg-transparent"
        }`}
        href="/dashboard/user/my-followers"
        onClick={() => setActiveSection("followers")}
      >
        My Followers
      </Link> */}
      {/* <Link
        className={`block w-full text-left p-2 rounded-md mb-2 ${
          activeSection === "manageUsers" ? "bg-blue-600" : "bg-transparent"
        }`}
        href="/dashboard/user/following"
        onClick={() => setActiveSection("following")}
      >
        Following User
      </Link> */}
      <Link
        className={`block w-full text-left p-2 rounded-md mb-2 ${
          activeSection === 'paymentsHistory' ? 'bg-blue-600' : 'bg-transparent'
        }`}
        href="/dashboard/user/payment-history"
        onClick={() => setActiveSection('paymentHistory')}
      >
        Payment History
      </Link>
    </div>
  );
};
