"use client";

import { Doc } from "@/convex/_generated/dataModel";
import IconPicker from "./icon-picker";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { useRef, useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
interface ToolbarProps{
    initialData:Doc<"documents">;
    preview?:boolean,
}
const Toolbar = ({initialData,preview}:ToolbarProps) => {
    const inputRef=useRef<HTMLTextAreaElement>(null);
    const [isEditing,setIsEditing] =useState(false);
    const [value,setvalue] =useState(initialData.title);
    
    const update =useMutation(api.documents.update);

    const enableInput =()=>{
        if(preview) return ;
        setIsEditing(true);
        setTimeout(()=>{
            setvalue(initialData.title);
            inputRef.current?.focus();
        },0);
    }

    const disableInput =()=>{
        setIsEditing(false);
    }

    const oninput=(value:string)=>{
        setvalue(value);
        update({
            id:initialData._id,
            title:value || "Untitiled"
        })
    }

    const onKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>)=>{
        if(e.key==="Enter"){
            e.preventDefault();
            disableInput();
        }
    }

  
  
  
    return ( 
        <div className="pl-[54px] group relative">
            {!!initialData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                        <IconPicker onChange={()=>{}}>
                            <p className="text-6xl hover:opcaity-75 transition">
                                {initialData.icon}
                            </p>
                        </IconPicker>
                        <Button 
                            onClick={()=>{}}
                            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                            variant="outline"
                            size="icon"
                            >
                        <X className="h-4 w-4"/>

                        </Button>
                </div>
            )}
            {!!initialData.icon && preview && (
                <p className="text-6xl pt-6">
                    {initialData.icon}
                </p>
            )}
           <div className="opacity-0 group-hover:opacity-100
            flex items-center gap-x-1 py-4">
            {!initialData. icon && !preview && (
                <IconPicker asChild onChange={() => {}}>
                    <Button
                    className="text-muted-foreground text-xs"
                    variant="outline"
                    size="sm">
                        <Smile className="h-4 w-4 mr-2" />
                        Add icon
                    </Button>
                </IconPicker>
            )}
            {!initialData.coverImage && !preview && (
                    <Button className="
                    text-muted-foreground text-xs
                    "
                    variant="outline"
                    size="icon">
                        <ImageIcon className="h-4 w-4 mr-2"/>
                    Add Cover
                    </Button>
            )}

        </div>
            {
                isEditing && !preview ?(
                    <TextareaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(e)=>oninput(e.target.value)}
                    className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
                    />
                ) :(
                    <div onClick={enableInput}
                    className="pb-[11.5px] text-5xl outline-none font-bold break-words text-[#3F3F3F] dark:text-[#CFCFCF]">
                            {initialData.title}
                    </div>
                )
            }

        </div>

            
     );
}
 
export default Toolbar;