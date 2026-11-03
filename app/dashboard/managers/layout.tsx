import { ReactNode } from "react";
import ManagerCard from "./_components/ManagerCard";

export default function LayoutManagers({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div className="w-4/12 max-h-[90vh] h-[90vh] overflow-hidden overflow-y-auto">
        <ManagerCard />
      </div>

      <div>{children}</div>
    </>
  );
}