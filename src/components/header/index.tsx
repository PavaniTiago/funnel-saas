"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Settings, User, Edit, LogOut, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut } from "next-auth/react";

export function Header() {
  const { theme, setTheme } = useTheme();

  const handleSignOut = () => {
    signOut();
  };

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Sheet>
          <SheetTrigger>
            <Settings className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent className="w-[20rem] flex flex-col">
            <SheetHeader className="self-start">
              <SheetTitle>Configurações</SheetTitle>
            </SheetHeader>
            <div className="flex w-full gap-2">
              <Button
                variant="outline"
                onClick={() => toggleTheme("light")}
                className={`rounded-lg w-full h-24 p-2 ${
                  theme === "light" ? "border-blue-500 bg-blue-50" : ""
                }`}
              >
                <Sun
                  className={`h-6 w-6 ${
                    theme === "light" ? "text-blue-600" : "text-gray-400"
                  }`}
                />
              </Button>

              <Button
                variant="outline"
                onClick={() => toggleTheme("dark")}
                className={`rounded-lg w-full h-24 p-2 ${
                  theme === "dark" ? "border-blue-500 bg-blue-50" : ""
                }`}
              >
                <Moon
                  className={`h-6 w-6 ${
                    theme === "dark" ? "text-blue-600" : "text-gray-400"
                  }`}
                />
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
