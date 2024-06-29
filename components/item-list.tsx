"use client";

import { roleData } from "@/lib/data/constant";
import { UserRole } from "@/lib/type";
import SidebarItem from "./sidebar-item";
import { FcBusinessman } from "react-icons/fc";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};
const ItemList = ({ session }: Props) => {
  const role = session?.user.role;

  if (!role) {
    return <p className="text-red-400">User Role Can not be Identified</p>;
  }

  if (role === UserRole.ADMIN) {
    return roleData.map((item) => (
      <SidebarItem
        key={item.role}
        label={item.role}
        Icon={FcBusinessman}
        href={item.route}
      />
    ));
  }
  return roleData
    .filter((item) => item.role === role)
    .map((item) => (
      <SidebarItem
        key={item.role}
        label={item.role}
        Icon={FcBusinessman}
        href={item.route}
      />
    ));
};

export default ItemList;
