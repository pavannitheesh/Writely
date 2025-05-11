"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface CoverImageProps {
    url: string;
    preview?:boolean
}
export const Cover = ({
    url,preview
}:CoverImageProps) =>
{
    return (
        <div className={cn("relative w-full h-[35vh]  group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {!!url && (
                <Image src={url} fill alt="Cover Image" className="object-cover"/>
            )}
            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100  absolute bottom-5 right-5 flex items-center gap-x-2">

                </div>
            )}

        </div>
    )
}