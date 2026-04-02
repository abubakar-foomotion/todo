import { addUser, checkUser } from "@/db/queries/user";
import { NextRequest, NextResponse } from "next/server";

// GET /api/user
export async function POST(request : NextRequest) {
  const req = await request.json();
  const {name,email} = req;
  const user = await checkUser(email, name);
  if(user){
    return NextResponse.json({result : "User exists", user}); 
  }else{
    return NextResponse.json({result : "User does not exist"}); 
  }

}

