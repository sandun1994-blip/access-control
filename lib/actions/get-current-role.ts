import { getSession } from "next-auth/react";

export const getCurrentRole = async () => {
  const session = await getSession();

  return session;
};
