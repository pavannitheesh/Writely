"use client";
import useScroll from "@/hooks/use-scroll-hooks";
import { cn } from "@/lib/utils";
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
const Navbar = () => {
    const { isAuthenticated,isLoading } = useConvexAuth();
    const scrolled=useScroll(30);
    return ( 
        <div className={cn("dark:bg-[#1F1F1F] fixed top-0 p-6 flex items-center w-full  bg-background z-50",scrolled?" border-b-2 shadow-sm":"shadow-none")}>
            <Logo/>
            <div className=" md:ml-auto flex flex-row gap-4 md:gap-8 items-center justify-between md:justify-end w-full">
          {isLoading && <Spinner/>}
          {
            !isAuthenticated && !isLoading && (
                <>
            <SignInButton mode="modal">
                <Button variant="ghost">Login</Button>
            </SignInButton>
            <SignInButton mode="modal">
                <Button >Get Writely for free</Button>
            </SignInButton>
            </>
            )
          }
          {isAuthenticated && !isLoading && (
            <>
            <Button variant="ghost" asChild>
                <Link href="/documents">Enter Writely</Link>
            </Button>
            <UserButton />
            </>)}
            <ModeToggle/>
            </div>

        </div>
     );
}
 
export default Navbar;