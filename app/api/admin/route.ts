import { auth } from "@/auth";
import { db } from "@/lib/data/db";
import { UserRole } from "@/lib/type";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await auth();
  // console.log('role',data);

  if (data?.user.role === UserRole.ADMIN) {
    if (data.user.id) {
      const admin = await db.admin.findUnique({
        where: { userId: Number(data.user.id) },
      });

      // console.log({admin});

      return Response.json({ data: admin }, { status: 200 });
    }
    return new NextResponse(null, {
      status: 200,
    });
  }
  return new NextResponse(null, { status: 403 });
}
