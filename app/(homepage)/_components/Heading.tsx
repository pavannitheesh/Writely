"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { SignInButton } from '@clerk/nextjs';
const Heading = () => {
    const { isAuthenticated,isLoading } = useConvexAuth();
    return ( 
        <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl
        font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome
        to <span className="underline">Writely</span>
        </h1>
        <h3 className="text-base sm:text-xl md:text-2xl
        font-medium">
        Writely is the connected workspace where <br />
        better, faster work happens.
        </h3>
        {isLoading && <div className="flex justify-center w-full items-center">
        <Spinner size="lg"/>
        </div>}
        {
            isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                Enter Writely
                <ArrowRight className="h-4 w-4 ml-2"/>
                </Link>
            </Button>
            )
        }
        {
            !isAuthenticated && !isLoading && (
                <>                <SignInButton mode="modal">
                <Button>
                Get Writely for free
                <ArrowRight className="h-4 w-4 ml-2"/>
            </Button>
            </SignInButton>
            </>

            )
        }
        </div>
     );
}
 
export default Heading;