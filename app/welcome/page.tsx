"use client";

import { useState } from "react";

export default function Welcome() {
  const [signIn, setSignIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  async function handleSignInAndSignUp(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (signIn) {
      // sign in logic
      try {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email, name }),
        });
        const jsonResponse = await res.json();
      } catch (error) {
        console.log(error);
        console.log("Error fetching user data");
      }
    } else {
      // sign up logic
      console.log("SIGN UP LOGIC");
    }
  }

  return (
    <div>
      <h1 className="text-center">
        {signIn === true ? "sign in" : "sign up"}{" "}
      </h1>
      <form>
        <label htmlFor="email" className="m-4">
          Enter Email
        </label>
        <input
          type="email"
          placeholder="Email"
          required
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="name" className="m-4">
          Enter Name
        </label>
        <input
          type="text"
          placeholder="name"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      <button className="m-4" onClick={handleSignInAndSignUp}>
        Enter
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setSignIn((prev) => !prev);
        }}
      >
        Create Account if not.!
      </button>
    </div>
  );
}
