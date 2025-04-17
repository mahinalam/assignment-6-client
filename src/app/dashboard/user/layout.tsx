"use client";

import { UserSidebar } from "@/src/components/dashboard/UserSidebar";
import { Sidebar } from "@/src/components/Sidebar";
import { Button } from "@nextui-org/button";
import React, { ReactNode, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<string>("overview");

  return (
    <div className="flex">
      <div>
        <UserSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      {children}
    </div>
  );
};

export default DashboardLayout;
