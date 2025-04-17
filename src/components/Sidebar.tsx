import Link from "next/link";

interface SidebarProps {
  setActiveSection: (section: string) => void;
  activeSection: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  setActiveSection,
  activeSection,
}) => {
  return (
    <div className="bg-gray-800 text-white w-[280px] min-h-screen p-6">
      <Link href="/">
        {" "}
        <h2 className="text-lg font-bold mb-6">Green Haven</h2>
      </Link>
      <Link
        href="/dashboard/admin/overview"
        className={`block w-full text-left p-2 rounded-md mb-2 ${
          activeSection === "overview" ? "bg-blue-600" : "bg-transparent"
        }`}
        onClick={() => setActiveSection("overview")}
      >
        Overview
      </Link>
      <Link
        className={`block w-full text-left p-2 rounded-md mb-2 ${
          activeSection === "managePosts" ? "bg-blue-600" : "bg-transparent"
        }`}
        href="/dashboard/admin/manage-posts"
        onClick={() => setActiveSection("managePosts")}
      >
        Manage Posts
      </Link>
      <Link
        className={`block w-full text-left p-2 rounded-md mb-2 ${
          activeSection === "manageUsers" ? "bg-blue-600" : "bg-transparent"
        }`}
        href="/dashboard/admin/manage-users"
        onClick={() => setActiveSection("manageUsers")}
      >
        Manage Users
      </Link>
      <Link
        className={`block w-full text-left p-2 rounded-md mb-2 ${
          activeSection === "paymentsHistory" ? "bg-blue-600" : "bg-transparent"
        }`}
        href="/dashboard/admin/payment-history"
        onClick={() => setActiveSection("paymentsHistory")}
      >
        Payment History
      </Link>
    </div>
  );
};
