"use client";

import useAuth from "@/lib/hooks/use-auth";
import FormError from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: string[];
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Loading....</p>;
  }

  if (!auth.role || !allowedRole.includes(auth.role)) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
};
