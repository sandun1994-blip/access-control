"use server";

import { db } from "@/lib/data/db";
import { getUserByEmail } from "@/lib/data/user";
import { RegisterSchema } from "@/lib/schema";
import { UserRole } from "@/lib/type";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
  
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, username, password, contactNo, firstName, lastName } =
    validateFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email alredy in use!" };
  }

  const user = await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      firstName,
      contactNo,
      lastName,
    },
  });
  // const user_type:string = "ADMIN";
  // switch (user_type) {
  //   case 'ADMIN':
  //     await db.admin.create({
  //       data: {
  //         userId: user.id,
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         email,
  //         imageUrl: "",
  //       },
  //     });
  //     break;

  //   case 'TEACHER':
  //     await db.teacher.create({
  //       data: {
  //         userId: user.id,
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         email,
  //         imageUrl: "",
  //       },
  //     });
  //     break;

  //   default:
  //     await db.student.create({
  //       data: {
  //         userId: user.id,
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         email,
  //         imageUrl: "",
  //       },
  //     });
  //     break;
  // }

  return { success: "User Created" };
};
