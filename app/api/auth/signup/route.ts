import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, name, password, role } = await request.json();
  try {
    if (!email || !name || !password || !role) {
      throw new Error("Please enter an email, name, password and role");
    }
    const Existinguser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (Existinguser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data : {
            email ,
            name , 
            password : hashedPassword,
            role : role as "USER" | "ADMIN" | "MODERATOR",
        },
    })
    const {password : _ , ...userWithoutPassword} = user;
    return NextResponse.json(userWithoutPassword , {status : 201});
  } catch (error : any ) {
    return NextResponse.json({error : error.message}, {status : 400})
  }
}

