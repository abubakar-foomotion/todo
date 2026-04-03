"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/lib/store/userStore";

export default function Welcome() {
  const [signIn, setSignIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const { setId } = useUserStore();

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
          console.log(jsonResponse.user);
          // set the user id in the store
          setId(jsonResponse.user.id);
          // redirect to todo page
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
          // set the user id in the store
          setId(jsonResponse.user.id);
          // redirect to todo page
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
    <div className="p-4 m-4 border rounded-lg bg-gray-200">
      <h1 className="text-center">
        {signIn === true ? "sign in" : "sign up"}{" "}
      </h1>
      <div className="px-4 py-2 flex flex-col justify-center items-center mt-4 mb-4 lg:flex-row">
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
          className="p-1 border rounded-md"
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
          className="border p-1 rounded-md"
        />
        <button className="border rounded-md mt-4 p-1 lg:ml-4 lg:w-20" type="button" onClick={handleSignInAndSignUp}>
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
