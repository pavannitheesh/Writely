"use client";

import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { MoreHorizontal, TrashIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
interface MenuProps{
    documentId:Id<"documents">
}
const Menu = ({documentId}:MenuProps) => {
    const router=useRouter();
    const user =useUser();

    const archive =useMutation(api.documents.archive);

    const onArchive =()=>{
        const promise = archive({id:documentId});
        toast.promise(promise,{
            loading:"Moving to trash..",
            success:"Note moved to trash!.",
            error:"Failed to archive note."
        });

        router.push("/documents");
    }


    return ( 
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
                <MoreHorizontal className="h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            align="end"
            className="w-60"
            alignOffset={8}
            forceMount
        >
          <DropdownMenuItem onClick={onArchive}>
                <TrashIcon className="w-4 h-4 mr-2 "/>Delete
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <div className="text-xs text-muted-foreground">
            Last edited by : {user.user?.username}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
     );
}
Menu.Skeleton =function MenuSkeleton(){
    return (
        <Skeleton className="w-10 h-10"/>
    )
}
 
export default Menu;