"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Welcome() {
  const [signIn, setSignIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const router = useRouter();

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
          body: JSON.stringify({ email, name, type: "signIn" }),
        });
        const jsonResponse = await res.json();
        if (jsonResponse.user !== undefined) {
          router.push("/todo");
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.log(error);
        console.log("Error fetching user data");
      }
    } else {
      // sign up logic
      console.log("SIGN UP LOGIC");
      try {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email, name, type: "signUp" }),
        });
        const jsonResponse = await res.json();
        if (jsonResponse.user !== undefined) {
          router.push("/todo");
        } else {
          console.log("Sign up failed");
        }
      } catch (error) {
        console.log(error);
        console.log("Error fetching user data");
      }
    }
  }

  return (
    <div>
      <h1 className="text-center">
        {signIn === true ? "sign in" : "sign up"}{" "}
      </h1>
      <div>
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
        <button className="m-4" type="button" onClick={handleSignInAndSignUp}>
          Enter
        </button>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setSignIn((prev) => !prev);
        }}
      >
        {signIn ? "Create Account if not." : "Already have an account?"}
      </button>
    </div>
  );
}
