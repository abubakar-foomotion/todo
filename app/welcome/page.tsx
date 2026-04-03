"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/lib/store/userStore";
import { postNewUser, getExistingUser } from "@/services/todos";
import CustomButton from "@/components/CustomButton";
import { text } from "stream/consumers";

export default function Welcome() {
  const [signIn, setSignIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const { setId } = useUserStore();

  async function handleSignInAndSignUp(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (signIn) {
      try {
        const jsonResponse = await getExistingUser(name, email);
        if (jsonResponse.user !== undefined) {
          console.log(jsonResponse.user);
          // set the user id in the store
          setId(jsonResponse.user.id);
          // redirect to todo page
          router.push("/todo");
        } else {
          console.log("User not found");
          alert("User not found. Please check your credentials or sign up.");
        }
      } catch (error) {
        console.log(error);
        console.log("Error fetching user data");
      }
    } else {
      try {
        const jsonResponse = await postNewUser(name, email);
        if (jsonResponse.user !== undefined) {
          // set the user id in the store
          setId(jsonResponse.user.id);
          // redirect to todo page
          router.push("/todo");
        } else {
          console.log("Sign up failed");
          alert("Sign up failed. Please try again.");
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
        <CustomButton onClickFunction={handleSignInAndSignUp} text="Enter"/>
      </div>
      <CustomButton
        onClickFunction={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          setSignIn((prev) => !prev);
        }}
        text={signIn ? "Create Account if not." : "Already have an account?"}
      />

      {/* <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setSignIn((prev) => !prev);
        }}
      >
        {signIn ? "Create Account if not." : "Already have an account?"}
      </button> */}
    </div>
  );
}
