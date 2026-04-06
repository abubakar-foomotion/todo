"use client";
import { useUserStore } from "@/lib/store/userStore";

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
      <body className="bg-sky-400">{userId === "" ? <Welcome /> : <div>{children}</div>}</body>
    </html>
  );

}
