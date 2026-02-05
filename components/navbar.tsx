"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GeneratedAvatar } from "./generated-avatr";
import { CreditCardIcon, LayoutDashboard } from "lucide-react";
import { SignOutView } from "@/lib/modules/ui/auth/view/sign-out-view";

export const Navbar = () => {
  const { data: session } = useSession();
  console.log("image", session?.user?.image);

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container max-w-6xl mx-auto h-16 flex items-center justify-between px-8">
        <Link href={"/"} className="flex items-center gap-4">
          <Image
            src={"/logo.svg"}
            alt="profile picture"
            width={36}
            height={36}
          />
          <span className="text-2xl font-bold ">Task<span className="text-primary">Flow</span></span>
        </Link>
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {session?.user?.image ? (
                <button className="rounded-full border">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={session.user.image ?? ""}
                      alt={session.user.name ?? "User"}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {session.user.name?.slice(0, 2).toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              ) : (
                <GeneratedAvatar
                  seed={session?.user?.name.toUpperCase()}
                  variant="initials"
                  className="w-9 h-9 mr-3"
                />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>
                <div className="flex flex-col gap-1">
                  <span className="font-medium truncate">
                    {session?.user.name}
                  </span>
                  <span className="text-sm font-normal text-muted-foreground truncate">
                    {session?.user.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LayoutDashboard className="size-4" />
                <Link href={"/dashboard"}>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon className="size-4" />
                Billing
              </DropdownMenuItem>
              <SignOutView />
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-6">
            <Link href={"sign-in"}>
              <Button
                variant={"ghost"}
                className="border text-primary font-semibold"
              >
                Login
              </Button>
            </Link>
            <Link href={"sign-up"}>
              <Button className="font-semibold">Start for Free</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
