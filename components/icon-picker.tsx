"use client";

import EmojiPicker ,{Theme} from "emoji-picker-react";
import {useTheme} from "next-themes";

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

interface iconPickerProps{
    onChange : (icon:string)=>void;
    children :React.ReactNode,
    asChild?:boolean
}
const IconPicker = ({
    onChange,
    children,
    asChild
}:iconPickerProps) => {
    const {resolvedTheme }=useTheme();
    const current =(resolvedTheme || 'light') as keyof typeof themeMap 

    const themeMap = {
        "dark":Theme.DARK,
        "light" : Theme.LIGHT
    }
    const theme=themeMap[current];

    return ( 
       <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className=" p-0 w-full border-none shadow-none">
                <EmojiPicker
                    height={350}
                    theme={
                        theme
                    }
                    onEmojiClick={(data)=>onChange(data.emoji)}
                />
            </PopoverContent>
       </Popover>
     );
}
 
export default IconPicker;