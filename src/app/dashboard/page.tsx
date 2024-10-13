"use client";

import { useState } from "react";

// import { Sidebar } from "../components/Sidebar";
// import { Graph } from "../components/Graph";
import { Sidebar } from "@/src/components/Sidebar";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {activeSection === "overview" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">GreenHaven</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* <Graph title="Monthly Payments" />
              <Graph title="Posts Activity" />
              <Graph title="User Activity" /> */}
            </div>
          </div>
        )}
        {/* {activeSection === 'managePosts' && <PostsManagement />}
        {activeSection === 'manageUsers' && <UsersManagement />}
        {activeSection === 'paymentsHistory' && <PaymentsHistory />} */}
      </div>
    </div>
  );
};

export default Dashboard;
