import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/data/db";
import { getUserById } from "./lib/data/user";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost:true,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
    //  console.log("signIn");
      return true;
    },
    async session({ token, session }) {
     // console.log("session",session,token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user, profile }) {
     // console.log('jwt',{token});
      
      if (!token.sub) {
        return token;
      }

      const exsitingUser = await getUserById((token.sub));

      if (!exsitingUser) {
        return token;
      }

      token.role = exsitingUser.userType;
      token.name = exsitingUser.username;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
