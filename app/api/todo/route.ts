import { addTodo } from "@/db/queries/todo";
import { db } from "@/db/index";
import { todos } from "@/db/schema";
import { NextResponse , NextRequest} from "next/server";
import {getAllTodos} from "@/db/queries/todo";

// POST /api/todo
export async function POST(request : NextRequest) {
    const {userId, heading, description} = await request.json();
    await addTodo(userId,heading, description);
    return new Response("Todo added successfully");
}
``
// GET /api/todo
export async function GET() {
    const result = await getAllTodos();
    return NextResponse.json(result);
}