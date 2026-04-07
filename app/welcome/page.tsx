"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/lib/store/userStore";
import { postNewUser, getExistingUser } from "@/services/todos";
import CustomButton from "@/components/CustomButton";

export default function Welcome() {
  const [signIn, setSignIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const { setId } = useUserStore();

  async function handleSignInAndSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (signIn) {
      try {
        const jsonResponse = await getExistingUser(name, email);
        if (jsonResponse.user !== undefined) {
          console.log(jsonResponse.user);
          setId(jsonResponse.user.id);
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
        const checkForExistingUser = await getExistingUser(name, email);
        if (checkForExistingUser.user !== undefined) {
          alert("User already exists. Please sign in instead.");
          return;
        }
        const jsonResponse = await postNewUser(name, email);
        if (jsonResponse.user !== undefined) {
          setId(jsonResponse.user.id);
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
    <div className="flex justify-center items-center min-h-screen bg-[#FAFAFA]">
      <div className="p-4 border rounded-lg bg-[#FFFFFF]">
        <h1 className="text-center">
          {signIn === true ? "sign in" : "sign up"}{" "}
        </h1>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleSignInAndSignUp(e)
          }
          className="px-4 py-2 flex flex-col justify-center items-center mt-4 mb-4"
        >
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
            // className="p-1 border rounded-md"
            className="p-1 inset-shadow-sm inset-shadow-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  focus:border-transparent w-full"
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
            // className="border p-1 rounded-md"
            className="p-1 inset-shadow-sm inset-shadow-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  focus:border-transparent w-full"
          />
          <CustomButton
            onClickFunction={() => {}}
            text={signIn === true ? "sign in" : "sign up"}
          />
        </form>
        <CustomButton
          onClickFunction={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setEmail("");
            setName("");
            setSignIn((prev) => !prev);
          }}
          text={signIn ? "Create Account if not." : "Already have an account?"}
        />
      </div>
    </div>
  );
}
