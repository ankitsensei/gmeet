"use client";
import { Info, LogOut, Moon, Plus, Sun, Video, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const formatTimeDate = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const userPlaceHolder = session?.user.name
    ?.split(" ")
    .map((name) => name[0])
    .join();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/user-auth" });
  };

  return (
    <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <Video className="w-8 h-8 text-blue-500" />
          <span className="hidden md:block text-xl font-semibold text-gray-800 dark:text-white">
            GMeet
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-md text-gray-500 dark:text-gray-200">
          {formatTimeDate()}
        </span>
        <button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-orange-500" />
          ) : (
            <Moon className="w-5 h-5 text-blue-500" />
          )}
        </button>
        <button variant="ghost" size="icon">
          <Info className="w-5 h-5 ml-2" />
        </button>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              {session?.user?.image ? (
                <AvatarImage
                  src={session?.user?.image}
                  alt={session?.user?.name}
                />
              ) : (
                <AvatarFallback className="text-md dark:bg-gray-300">
                  {userPlaceHolder}
                </AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-800 dark:text-white">
                {session?.user?.email}
              </span>
              <button
                className="rounded-full p-4"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col items-center mb-4">
              <Avatar className="w-20 h-20 mb-2">
                {session?.user?.image ? (
                  <AvatarImage
                    
                    src={session?.user?.image}
                    alt={session?.user?.name}
                  />
                ) : (
                  <AvatarFallback className="text-2xl dark:bg-gray-300">
                    {userPlaceHolder}
                  </AvatarFallback>
                )}
              </Avatar>
              <h1 className="text-xl font-semibold mt-2">
                Hi, {session?.user?.name}!
              </h1>
            </div>
            <div className="flex mb-4">
              <button
                className="w-1/2 h-14 rounded-l-full flex items-center justify-center border border-gray-600"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </button>
              <button
                className="w-1/2 h-14 rounded-r-full flex items-center justify-center border border-gray-600"
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                SignOut
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
