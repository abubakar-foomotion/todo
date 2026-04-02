import { addTodo } from "@/db/queries/todo";
import { db } from "@/db/index";
import { todos } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST() {
    await addTodo();
    return new Response("Todo added successfully");
}

// GET /api/todo
export async function GET() {
    const result = await db.select().from(todos);
    return NextResponse.json(result);
}