"use client";



import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogoutButton } from "./logout-button";
import { useCurrentUser } from "@/lib/hooks/use-current-user";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-green-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="center">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon
              className="h-4 w-4 mr-2                                    +9
                 "
            />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
