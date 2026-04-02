import { addTodo } from "@/db/queries/todo";
import { db } from "@/db/index";
import { todos } from "@/db/schema";
import { NextResponse } from "next/server";
import {getAllTodos} from "@/db/queries/todo";

export async function POST() {
    await addTodo();
    return new Response("Todo added successfully");
}

// GET /api/todo
export async function GET() {
    const result = await getAllTodos();
    return NextResponse.json(result);
}