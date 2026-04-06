"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    
    return (
      <>
        <p>Welcome {session.user?.name}</p>
        <p>Welcome {session.user?.email}</p>
        <button onClick={() => signOut()}>Logout</button>
      </>
    );
  }

  return (
    <>
      <button onClick={() => signIn("google")}>
        Login with Google
      </button>

      <button onClick={() => signIn("github")}>
        Login with GitHub
      </button>
    </>
  );
}