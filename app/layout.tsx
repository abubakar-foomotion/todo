"use client";
import { useUserStore } from "@/lib/store/userStore";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import Welcome from "./welcome/page";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useUserStore();
  return (
    <html lang="en">
      <body className="bg-[#FAFAFA]">
        {userId === "" ? <Welcome /> : <div>{children}</div>}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
