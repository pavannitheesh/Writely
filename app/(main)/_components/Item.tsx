"use client"

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

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

    return ( 
        <div
        onClick={onClick}
            role="button"
            style={{
                paddingLeft: `${(level * 12)+12}px`,
            }}
            className={cn("group min-h-[27px] text-sm flex items-center py-2 pr-3 w-full  rounded-md text-muted-foreground font-medium hover:bg-primary/5 cursor-pointer",
                active && "bg-primary/5 text-primary font-semibold",
            )}>
               {!!id && (
                <div role="button" className="h-full rounded-sm bg-neutral-300 dark:bg-neutral-600 mr-2" onClick={onExpand}>
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
                <span className="text-xs">⌘</span>k

               </kbd>
            )}

        </div>
     );
}
 
export default Item;