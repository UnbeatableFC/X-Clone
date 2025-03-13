import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  console.log(session, "session");
  if (session?.user) {
    return redirect("/home");
  }
  return (
    <div className="">
      <div>Sidebar</div>
      {children}
    </div>
  );
}

export default MainLayout;
