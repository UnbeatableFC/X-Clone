import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Not authenticated", status: "error" },
        { status: 401 }
      );
    }

    const { name, username, bio, profileImage, coverImage } =
      await req.json();
    if (!name || !username) {
      return NextResponse.json(
        {
          message: "Missing Field: Name ,Username",
          status: "error",
        },
        { status: 400 }
      );
    }

    const userId = +session.user.id;
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });
    return NextResponse.json(
      {
        message: "User was successfully updated",
        status: "success",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", status: "error" },
      { status: 500 }
    );
  }
}
