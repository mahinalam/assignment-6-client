import React, { ReactNode } from 'react';

const DashboardContainer = ({ children }: { children?: ReactNode }) => {
  return <div className="md:w-[80%] mx-auto w-[97%]">{children}</div>;
};

export default DashboardContainer;
