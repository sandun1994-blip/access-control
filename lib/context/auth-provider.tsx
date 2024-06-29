"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { UserRole } from "../type";
import { getCurrentRole } from "../actions/get-current-role";

type AuthType = {
  token?: string;
  refreshToken?: string;
  role: string | null | undefined;
  email: string | null | undefined;
  name: string | null | undefined;
  id?: string | number | null | undefined;
};

type AuthContextType = {
  auth: AuthType;
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  auth: {
    token: "",
    email: "",
    role: null,
    id: "",
    name: "",
  },
  setAuth: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthType>({
    token: "",
    role: null,
    email: "",
    name: "",
    id: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentRole()
      .then((data) => {
        const user = data?.user;
        if (user) {
          setAuth({
            role: user.role,
            email: user.email,
            name: user.name,
            id: user.id,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
