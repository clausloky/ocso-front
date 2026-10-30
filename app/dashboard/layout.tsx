"use client";

import { usePathname } from "next/navigation";
import Header from "./_components/Header"
import Sidebar from "./_components/_sidebar/Sidebar"

export default function LayoutDashboard({
  children,
  location,
}: Readonly<{ children: React.ReactNode; location: React.ReactNode }>) {
  const path = usePathname();
  return (
    <div className="w-screen h-screen bg-orange-50">
      <Header />
      <div className="flex flex-row items-center">
        <Sidebar />
        {children}
        {path === "/dashboard" ? location : ""}
      </div>
    </div>
  );
}