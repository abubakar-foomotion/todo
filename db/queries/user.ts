
import {db} from '../index';
import {users} from '../schema';

import { eq, desc } from "drizzle-orm";

export async function getAllUsers() {
  return await db.select().from(users).orderBy(desc(users.id));
}

export async function addUser() {
    const name = "John Doe";
    const email = "john@doe.com";
    await db.insert(users).values({ name, email });
}
