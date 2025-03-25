import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { params } = context;
  try {
    const postId = params.postId;
    if (!postId) {
      return NextResponse.json(
        {
          message: "Post Id Required",
          status: "error",
        },
        {
          status: 400,
        }
      );
    }

    const post = await prisma.post.findUnique({
      where: {
        id: +postId,
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        comments: {
          include: {
            User: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json({
      status: "success",
      post,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Failed to retrieve data",
        status: "error",
      },
      {
        status: 400,
      }
    );
  }
}
