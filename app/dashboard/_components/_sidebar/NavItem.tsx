"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface NavItemProps {
    icon: IconType;
    path: string;
}

const NavItem = ({icon: Icon, path} : NavItemProps) => {
    const pathName = usePathname();
    console.log(pathName);

    let styles = "w-full w-full flex py-5 rounded-md w-10/12 transition-colors ";
    if (pathName === path) styles += "bg-orange-400 justify-center";

    return (
        <Link href={path} className={styles}>
            <Icon className="text-4xl" />
        </Link>
    )
}

export default NavItem;
