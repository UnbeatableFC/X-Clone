import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (session?.user) {
    return redirect("/");
  }
  return (
    <div className="h-screen w-full ">
      <div className="h-full mx-auto">{children}</div>
    </div>
  );
}

export default AuthLayout;
