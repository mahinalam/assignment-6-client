import React, { ReactNode } from "react";

const Container = ({ children }: { children?: ReactNode }) => {
  return <div className="md:w-[70%] mx-auto w-[95%]">{children}</div>;
};

export default Container;
