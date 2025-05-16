"use client"
import { Avatar,AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
 } from  "@/components/ui/dropdown-menu";
 import { SignOutButton, useUser } from "@clerk/nextjs";
 import { ChevronsLeftRight } from "lucide-react";
const UserItem = () => {
    const {user}=useUser();
    return ( 
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div role="button" className="flex items-center  p-3 text-sm hover:bg-primary/5 cursor-pointer ">
                       <div className="gap-x-2 flex items-center max-w-[150px]">
                        <Avatar className="w-6 h-6 cursor-pointer" onClick={(e)=>e.stopPropagation()}>
                            <AvatarImage src={user?.imageUrl} alt="User" />
                        </Avatar>
                            <p className="text-sm text-start line-clamp-1 font-medium">{user?.username}&apos;Writely</p>
                        </div>
                        <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" size={20} />


                    </div>
                </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start" forceMount alignOffset={11}>
     <div className="flex flex-col space-y-4 p-2">
        <p className="text-xs font-medium leading-none text-muted-foreground">
           {user?.emailAddresses[0].emailAddress}

        </p>
        <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
                <Avatar className="w-6 h-6 cursor-pointer">
                    <AvatarImage src={user?.imageUrl} alt="User" />
                </Avatar>

            </div>
            <div className="space-y-1 ">
                <p className="text-sm line-clamp-1">
                    {user?.username}&apos;s Writely
                </p>

            </div>

        </div>

     </div>
        <DropdownMenuSeparator />
          <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground">
            <SignOutButton>Logout</SignOutButton>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
     );
}
 
export default UserItem;