"use client";
import Logo from "@/components/logo";
import {
  Bell,
  Feather,
  Home,
  LucideIcon,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import SidebarItem from "./_common/SidebarItem";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Spinner from "@/components/spinner";
import { doLogOut } from "@/app/actions/auth.action";
import { useCurrentUserContext } from "@/context/currentUser-provider";

interface MenuType {
  label: string;
  href?: string;
  icon?: LucideIcon;
  alert?: boolean;
}

const Sidebar = () => {
  const router = useRouter();
  const { data, isLoading, refetch } = useCurrentUserContext();
  const fetchedUser: UserType = data?.currentUser ?? ({} as UserType);
  const username = fetchedUser?.username ?? "";

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="icon" />
      </div>
    );
  }

  console.log(
    fetchedUser?.hasNotification,
    "fetchedUser?.hasNotification"
  );

  const MENU_LIST: MenuType[] = [
    {
      label: "Home",
      href: "/home",
      icon: Home,
    },
    {
      label: "Search",
      href: "/search",
      icon: Search,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: Bell,
      alert: true,
    },
    {
      label: "Premium",
      href: "#premium",
    },
    {
      label: "Profile",
      href: `/${username}`,
      icon: User,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-full fixed h-screen pr-0 lg:pr-6 overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col h-full items-start ">
        <div className="space-y-0 h-full pb-3 flex flex-col justify-between w-auto lg:w-[230px]">
          <div className="flex-1">
            <div className="my-2 pt-1 px-4">
              <Logo
                className="!h-8 !w-8 cursor-pointer"
                width="auto"
                height="auto"
                onClick={() => router.push("/home")}
              />
            </div>
            {MENU_LIST.map((item) => {
              return (
                <SidebarItem
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                  alert={item.alert}
                />
              );
            })}

            <div className="w-full pt-4">
              <div>
                <Button
                  variant="brandPrimary"
                  size="icon"
                  className="mt-0 lg:hidden rounded-full ml-2 h-10 w-10 flex items-center justify-center hover:bg-opacity-80 transition cursor-pointer"
                >
                  <Feather size={24} color="white " />
                </Button>
                <Button
                  variant="brandPrimary"
                  className="w-full hidden lg:block !pt-4 !py-2 !h-auto !text-white transition font-semibold text-[20px]"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
          <div className="shrink flex items-center w-full justify-between">
            {isLoading ? (
              <Spinner size="lg" />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="!outline-none">
                  <SidebarItem
                    isUser={true}
                    userInfo={{
                      username: fetchedUser?.username || "",
                      fullname: fetchedUser?.name || "",
                      profileImgUrl: fetchedUser?.profileImage || "",
                    }}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <form action={doLogOut}>
                      <button
                        type="submit"
                        className="w-full flex flex-row items-center gap-2 
                      px-4 text-base !cursor-pointer
                      "
                      >
                        Log out{" "}
                        <span className="block max-w-[120px] truncate ml-1">
                          Wisdom Mpamugo
                        </span>
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
