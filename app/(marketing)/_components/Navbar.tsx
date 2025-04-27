"use client";
import useScroll from "@/hooks/use-scroll-hooks";
import { cn } from "@/lib/utils";
import Logo from './Logo';
const Navbar = () => {
    const scrolled=useScroll(30);
    return ( 
        <div className={cn("fixed top-0 p-6 flex items-center w-full  bg-background z-50",scrolled?" border-b-2 shadow-sm":"shadow-none")}>
            <Logo/>
            <div className=" md:ml-auto flex flex-row gap-4 md:gap-8 items-center justify-start md:justify-end w-full">
            Login
            </div>

        </div>
     );
}
 
export default Navbar;