import { eq } from 'drizzle-orm';
import {db} from '../index';
import {todos} from "../schema";


export async function getAllTodos() {
    const res = await db.select().from(todos);
    return res;

}

export async function addTodo(userId: string, heading: string, description: string) {
    await db.insert(todos).values({ userId, heading, description });
}

export async function deleteTodo(id:string) {
    await db.delete(todos).where(eq(todos.id, id));
}