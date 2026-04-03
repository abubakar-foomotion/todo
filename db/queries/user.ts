
import {db} from '../index';
import {users} from '../schema';
import { eq, and ,desc} from "drizzle-orm";


export async function checkUser(email: string, name:string) {
    const user = await db
  .select()
  .from(users)
  .where(
    and(
      eq(users.email, email),
      eq(users.name, name)
    )
  );
    return user.length > 0 ? user[0] : null;
    
}

export async function addUser(email: string, name: string) {
    const user = await checkUser(email, name);
    if(user) {
      return user;
    }
    else {
      const newUser = await db.insert(users).values({email, name}).returning();
      return newUser[0];
    }
}
