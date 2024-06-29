import { auth } from "@/auth";
import { db } from "@/lib/data/db";
import { UserRole } from "@/lib/type";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await auth();
  // console.log('role',data);

  if (data?.user.role === UserRole.ADMIN || data?.user.role === UserRole.TEACHER) {
    if (data.user.id) {
      const teacher = await db.teacher.findUnique({
        where: { userId: Number(data.user.id) },
      });
      return Response.json({ data: teacher }, { status: 200 });
    }
    return new NextResponse(null, {
      status: 200,
    });
  }
  return new NextResponse(null, { status: 403 });
}
