
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

export async function addUser() {
    const name = "John Doe";
    const email = "john@doe.com";
    await db.insert(users).values({ name, email });
}
