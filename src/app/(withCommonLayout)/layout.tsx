import LeftSection from "@/src/components/sharred/LeftSection";
import RightSection from "@/src/components/sharred/RightSection";
import { Navbar } from "@/src/components/UI/Navbar";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="block lg:hidden">
        <Navbar />
      </div>
      <div className=" flex p-5">
        <div className="w-2/12 lg:block hidden">
          <LeftSection />
        </div>
        <div className="lg:w-6/12 w-full lg:ml-auto">{children}</div>
        <div className="w-3/12 lg:block hidden">
          <RightSection />
        </div>
      </div>
    </div>
  );
}
