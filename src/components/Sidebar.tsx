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
    <div className="bg-gray-800 text-white w-64 min-h-screen p-6">
      <Link href="/">
        {" "}
        <h2 className="text-lg font-bold mb-6">Green Haven</h2>
      </Link>
      <button
        className={`block w-full text-left p-2 rounded-md mb-2 ${
          activeSection === "overview" ? "bg-blue-600" : "bg-gray-700"
        }`}
        onClick={() => setActiveSection("overview")}
      >
        Overview
      </button>
      <Link
        href="/dashboard/manage-posts"
        className={`block w-full text-left p-2 rounded-md mb-2 ${
          activeSection === "managePosts" ? "bg-blue-600" : "bg-gray-700"
        }`}
        onClick={() => setActiveSection("managePosts")}
      >
        Manage Posts
      </Link>
      <Link
        href="/dashboard/manage-users"
        className={`block w-full text-left p-2 rounded-md mb-2 ${
          activeSection === "manageUsers" ? "bg-blue-600" : "bg-gray-700"
        }`}
        onClick={() => setActiveSection("manageUsers")}
      >
        Manage Users
      </Link>
      <Link href='/dashboard/payment-history'
        className={`block w-full text-left p-2 rounded-md mb-2 ${
          activeSection === "paymentsHistory" ? "bg-blue-600" : "bg-gray-700"
        }`}
        onClick={() => setActiveSection("paymentsHistory")}
      >
        Payment History
      </Link>
    </div>
  );
};
