import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { UserButton } from "./auth/user-button";
import ItemList from "./item-list";
import { auth } from "@/auth";

type Props = {
  className?: string;
};

const Sidebar = async({ className }: Props) => {

  const session = await auth()
    
  return (
    <div
      className={cn(
        `lg:fixed  h-full lg:w-[256px] 
     left-0 top-0 px-4 border-r-2 flex-col`,
        className
      )}
    >
      <Link href={"/dashboard"}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3 mb-10">
          <h1 className="text-2xl font-extrabold text-green-600 uppercase">
            Education
          </h1>
        </div>
      </Link>

      <div className="flex flex-col gap-y-6 flex-1 ">{<ItemList session={session} />}</div>
      <div className="p-4 fixed bottom-5 left-20">
        <div className="flex flex-col gap-2 items-center">
          <UserButton />
          <span className="text-sm">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
