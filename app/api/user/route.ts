import { addUser, getAllUsers } from "@/db/queries/user";
import { NextResponse } from "next/server";

// GET /api/user
export async function GET() {
  const allUsers = await getAllUsers();
  return NextResponse.json(allUsers);
}

export async function POST() {
    await addUser();
    return NextResponse.json({result : "User added successfully"}); 
}
