"use client";

import { LuStore, LuTruck, LuUser, LuUsers, LuWheat } from "react-icons/lu"

import NavItem from "./NavItem"

export default function Sidebar() {
    return (
        <nav className="w-1/12 h-[90vh] bg-orange-200 flex flex-col items-center py-20">
            <NavItem icon={LuStore} path="/dashboard" />
            <NavItem icon={LuTruck} path="/dashboard/providers" />
            <NavItem icon={LuWheat} path="/dashboard/products" />
            <NavItem icon={LuUser} path="/dashboard/managers" />
            <NavItem icon={LuUsers} path="/dashboard/employees" />
        </nav>
    )
}