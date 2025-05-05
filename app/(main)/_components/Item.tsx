"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ItemProps {
    id?:Id<"documents">,
    documentIcon?:string,
    active?:boolean,
    expanded?:boolean,
    isSearch?:boolean,
    level?:number,
    onExpand?:()=>void,
    label: string;
    icon: LucideIcon;
    onClick: () => void;
}
const Item = ({id,documentIcon,label,icon:Icon,onClick,expanded,onExpand,active,isSearch,level=0}:ItemProps) => {
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    const create=useMutation(api.documents.create);
    const router=useRouter();

    const handleExpand = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the click event from bubbling up to the parent div
        onExpand?.();
    }

    const onCreate = (e: React.MouseEvent) => {
        e.stopPropagation();
       if(!id) return ;
       const promise = create({
            title:"Untitled Document",
            parentDocument:id
        }).then((res)=>{
            if(!expanded) onExpand?.();
           // router.push(`/documents/${res}`);
        })
        toast.promise(promise,{
            loading:"Creating Document...",
            success:"Document Created",
            error:"Error Creating Document"
        });
    }

    return ( 
        <div
        onClick={onClick}
            role="button"
            style={{
                paddingLeft: `${(level * 25)+12}px`,
            }}
            className={cn("group min-h-[27px] text-sm flex items-center py-2 pr-3 w-full  rounded-md text-muted-foreground font-medium hover:bg-primary/5 cursor-pointer",
                active && "bg-primary/5 text-primary font-semibold",
            )}>
               {!!id && (
                <div role="button" className="h-full rounded-sm bg-neutral-300 dark:bg-neutral-600 mr-2" onClick={handleExpand}>
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50"/>
                    </div>
               )}
               {documentIcon ? (
                <div className="shrink-0 mr-2 h-[18px] text-muted-foreground">
                    {documentIcon}

                </div>
               )
               : <Icon className="shrink-0 mr-2 h-[18px] text-muted-foreground"/>
            }
            <span className="truncate">

            {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5
                select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground
                opacity-100">
                <span className="text-xs">⌘</span>K

               </kbd>
            )}
            {
                !!id && (
                    <div className="ml-auto flex items-center gap-x-2">
                       <div className="opacity-0 group-hover:opacity-100  h-full ml-auto rounded-sm bg-neutral-300 dark:bg-neutral-600 mr-2" onClick={onCreate}>
                        <Plus className="h-4 w-4 shrink-0 text-muted-foreground/50"/>
                       </div>
                    </div>)
            }

        </div>
     );
}
 
export default Item;

Item.Skeleton=function ItemSkeleton({level=0}:{level?:number}) {
    return (
       <div style={{
        paddingLeft: `${(level * 12)+25}px`,}} className="flex gap-x-2 py-[3px]">
            <Skeleton className="h-4 w-4 " />
            <Skeleton className="h-4 w-[30%] "/>
       </div>
    )
}