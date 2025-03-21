import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import Sidebar from "../_components/Sidebar";
import { CurrentUserProvider } from "@/context/currentUser-provider";
import ModalProvider from "@/context/modal-provider";
import RightSidebar from "../_components/RightSidebar";

async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  console.log(session, "session");
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <CurrentUserProvider>
      <ModalProvider />
      <div className="h-screen">
        <div className="container mx-auto h-full xl:px-30 max-w-7xl">
          <div className="flex items-start justify-center h-full">
            <div className="shrink-0 flex flex-[0.15] lg:flex-[0.28] relative ">
              <Sidebar />
            </div>
            <div className="flex flex-row h-screen flex-1 gap-0 lg:gap-8">
              <main className="!bg-background lg:max-w-[600px] relative h-full flex-1 flex lg:flex-[0.95]">
                <hr className="w-[1px] fixed h-screen bg-[#eee] dark:bg-[rgb(47,51,54)]" />
                <div className="w-full">{children}</div>
                <hr className="w-[1px] fixed top-0 right-0 lg:right-[calc(100%-71%)] xl:right-[calc(100%-65%)] h-screen bg-[#eee] dark:bg-[rgb(47,51,54)]" />
              </main>
              <div className="hidden lg:flex shrink-0 relative h-screen">
                <RightSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CurrentUserProvider>
  );
}

export default MainLayout;
