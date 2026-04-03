import { addUser, checkUser } from "@/db/queries/user";
import { NextRequest, NextResponse } from "next/server";

// GET /api/user
export async function POST(request: NextRequest) {
  const req = await request.json();
  const { name, email, type } = req;

  if (type === "signIn") {
    const user = await checkUser(email, name);
    if (user) {
      return NextResponse.json({ result: "User exists", user });
    } else {
      return NextResponse.json({ result: "User does not exist" });
    }
  }
  //sign up logic
  const newUser = await addUser(email, name);
  if (newUser) {
    return NextResponse.json({ result: "User created", user: newUser });
  } else {
    return NextResponse.json({ result: "Failed to create user" });
  }
}
