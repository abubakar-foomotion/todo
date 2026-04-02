import {db} from '../index';
import {todos} from "../schema";

export async function getAllTodos() {
    return await db.select().from(todos);
}

export async function addTodo() {
    const userId = "8a57164-9536-4e13-810e-3cbd118eaba4";
    const heading = "Dummy heading";
    const description = "Dummy description";
    await db.insert(todos).values({ userId, heading, description });
}