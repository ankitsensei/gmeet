"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Sun, Video } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "@/components/theme-provider";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const userPlaceHolder = session?.user?.name
    ?.split(" ")
    .map((name) => name[0])
    .join("");

  const handlelogout = async () => {
    await signOut({ callbackUrl: "/user-auth" });
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
          <Video className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold tracking-tight">gmeet</span>
      </Link>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger
            nativeButton={false}
            render={
              <Avatar className="cursor-pointer h-8 w-8">
                {session?.user?.image ? (
                  <AvatarImage
                    src={session?.user?.image ?? undefined}
                    alt={session?.user?.name ?? undefined}
                  />
                ) : (
                  <AvatarFallback className="text-xs">
                    {userPlaceHolder}
                  </AvatarFallback>
                )}
              </Avatar>
            }
          />
          <DropdownMenuContent align="end" className="w-56 p-2">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{session?.user?.name}</p>
              <p className="text-xs text-muted-foreground">
                {session?.user?.email}
              </p>
            </div>
            <div className="h-px bg-border my-1" />
            <button
              onClick={handlelogout}
              className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-left rounded-sm hover:bg-accent transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
