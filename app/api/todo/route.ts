import { addTodo, deleteTodo ,getAllTodos, updateTodo} from "@/db/queries/todo";
import { db } from "@/db/index";
import { todos } from "@/db/schema";
import { NextResponse , NextRequest} from "next/server";

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
// DELETE /api/todo
export async function DELETE(request: NextRequest) {
    const { id } = await request.json();
    await deleteTodo(id);
    return new Response("Todo deleted successfully");
}

export async function PUT(request: NextRequest) {
    const { id, heading, description } = await request.json();
    await updateTodo(id, heading, description);
    return new Response("Todo updated successfully");
}