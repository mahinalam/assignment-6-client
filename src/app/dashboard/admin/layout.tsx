"use client";

import { Sidebar } from "@/src/components/Sidebar";
import { getCurrentUser } from "@/src/services/AuthService";
import { Button } from "@nextui-org/button";
import React, { ReactNode, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<string>("overview");

  return (
    <div className="flex">
      <div>
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
      <Button>Logout</Button>
      {children}
    </div>
  );
};

export default DashboardLayout;
