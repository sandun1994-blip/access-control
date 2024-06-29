"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type Props = {
  label: string;
  Icon: any;
  href: string;
};
const SidebarItem = ({ label, Icon, href }: Props) => {
  const pathname = usePathname();

  const active = pathname === href;
  return (
    <Button
      variant={active ? "sidebar" : "sidebarOutline"}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href} className="flex items-center gap-3">
        <Icon />
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
