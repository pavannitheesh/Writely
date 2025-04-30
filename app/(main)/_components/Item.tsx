"use client"

import { LucideIcon } from "lucide-react";

interface ItemProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
}
const Item = ({label,icon:Icon,onClick}:ItemProps) => {

    return ( 
        <div
        onClick={onClick}
            role="button"
            style={{paddingLeft:"12px"}} 
            className="group min-h-[27px] text-sm flex items-center py-2 pr-3 w-full  rounded-md text-muted-foreground font-medium hover:bg-primary/5 cursor-pointer">
            <div className="shrink-0 mr-2 h-[18px] text-muted-foreground">
                <Icon/>
            </div>
            <span>

            {label}
            </span>
        </div>
     );
}
 
export default Item;