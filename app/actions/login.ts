"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/data/route";
import { getUserByEmail } from "@/lib/data/user";
import { LoginSchema } from "@/lib/schema";
import { AuthError } from "next-auth";


export const login = async (values: any) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "sucess!" };
  } catch (error) {
    if (error instanceof AuthError) {
     
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
