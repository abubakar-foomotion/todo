import {db} from '../index';
import {todos} from "../schema";

export async function getAllTodos() {
    return await db.select().from(todos);
}

export async function addTodo(userId: string, heading: string, description: string) {
    await db.insert(todos).values({ userId, heading, description });
}