import { addTodo, deleteTodo ,getAllTodos, updateTodo} from "@/db/queries/todo";
import { db } from "@/db/index";
import { todos } from "@/db/schema";
import { NextResponse , NextRequest} from "next/server";

export async function POST(request : NextRequest) {
    const {userId, heading, description} = await request.json();
    const insertedObj = await addTodo(userId,heading, description);
    return NextResponse.json(insertedObj);
}

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get("userId") || "";
    const result = await getAllTodos(userId);
    return NextResponse.json(result);
}

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