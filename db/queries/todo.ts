import { eq } from 'drizzle-orm';
import {db} from '../index';
import {todos} from "../schema";

export async function getAllTodos(userId : string) {
    const res = await db.select().from(todos).where(eq(todos.userId, userId));
    return res;
}

export async function addTodo(userId: string, heading: string, description: string) {
    const res =  await db.insert(todos).values({ userId, heading, description }).returning();
    return res[0];
}

export async function deleteTodo(id:string) {
    const deletedData = await db.delete(todos).where(eq(todos.id, id)).returning();
    return deletedData[0];
}

export async function updateTodo(id:string, heading:string, description:string) {
    const updatedData = await db.update(todos).set({heading, description}).where(eq(todos.id, id)).returning();
    return updatedData[0];
}