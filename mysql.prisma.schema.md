# Prisma Schema

Here is the Prisma schema for MySQL:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id         Int       @id @default(autoincrement())
  username   String    @unique
  email      String    @unique
  firstName  String
  lastName   String
  contactNo  String
  password   String?
  userType   String    @default("STUDENT")
  teacher    Teacher?
  student    Student?
  admin      Admin?
  
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}

model Teacher {
  id        Int     @id @default(autoincrement())
  imageUrl  String?
  firstName String
  lastName  String
  email     String  @unique
  userId    Int     @unique
  user      User    @relation(fields: [userId], references: [id])
}

model Student {
  id        Int     @id @default(autoincrement())
  imageUrl  String?
  firstName String
  lastName  String
  email     String  @unique
  userId    Int     @unique
  user      User    @relation(fields: [userId], references: [id])
}

model Admin {
  id        Int     @id @default(autoincrement())
  imageUrl  String?
  firstName String
  lastName  String
  email     String  @unique
  userId    Int     @unique
  user      User    @relation(fields: [userId], references: [id])
}
