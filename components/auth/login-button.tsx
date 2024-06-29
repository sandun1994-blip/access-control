"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButtton = ({
  children,
  asChild,
  mode = "redirect",
}: LoginButtonProps) => {
  const onClick = () => {
    router.push('/auth/login')
  };
const router =useRouter()

  if (mode=='modal') {
    return <span>redirect</span>
  }

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
