import { NextResponse } from "next/server";

export async function GET() {
  // Your code here
  return NextResponse.json({ message: "Some data" }); // Make sure to return a response
}

export async function POST(request: Request) {
  // Your code here
  return NextResponse.json({ message: "Data received" }); // Make sure to return a response
}
