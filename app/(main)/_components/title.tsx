"use client";

import { useMutation } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';
interface TitleProps{
    initialData:Doc<"documents">
}
const Title = ({initialData}:TitleProps) => {
    const inputref = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState(initialData.title || "Untitled");
    const update = useMutation(api.documents.update);
    const [isEditing, setIsEditing] = useState(false);

    const enableInput = () => {
        setTitle(initialData.title);
        setIsEditing(true);
        setTimeout(() => {
            inputref.current?.focus();
            inputref.current?.setSelectionRange(0,inputref.current.value.length);
        }, 0);
    }

    const disableInput = () => {
        setIsEditing(false);
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        update({
            id: initialData._id,
            title: e.target.value || "Untitled",
        });
    }

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            disableInput();
        } else if (e.key === "Escape") {
            setTitle(initialData.title);
            disableInput();
        }
    }
    return ( 
        <div className="flex items-center gap-x-1">
            {!!initialData.icon && <p>
                    {initialData.icon}
                </p>
                }
                {isEditing ? (
                    <Input
                        ref={inputref}
                        onClick={enableInput}
                        onBlur={disableInput}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        className="h-7 px-2 focus-visible:ring-transparent"/>
                ):(
                    <Button
                    onClick={enableInput}
                    variant="ghost"
                    size="sm"
                    className="font-normal h-auto p-1"
                    >
                        <span>
                            {initialData.title}
                        </span>
                    </Button>

                )}
        </div>
     );
}

Title.Skeleton = function TitleSkeleton(){
    return (
        <Skeleton className="h-4 w-20 rounded-md"/>
    )
}
 
export default Title;