import { NextResponse } from "next/server";
import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { hash } from "bcryptjs";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const { name, username, email, language, password, confirmPassword } = body;

    if (!name || !email || !language || !password || !confirmPassword) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (password !== confirmPassword) {
      return new NextResponse("Password does not match", { status: 401 });
    }

    const checkexisting = await prismadb.user.findFirst({
      where: {
        email: email,
      },
    });

    if (checkexisting) {
      return new NextResponse("User already exist", { status: 401 });
    }

    const user = await prismadb.user.create({
      data: {
        name,
        username,
        image: "",
        email,
        hashedPassword: await hash(password, 12),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USERS_POST]", error);
    return new NextResponse("Initial error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  try {
    const users = await prismadb.user.findMany({});

    return NextResponse.json(users);
  } catch (error) {
    console.log("[USERS_GET]", error);
    return new NextResponse("Initial error", { status: 500 });
  }
}
