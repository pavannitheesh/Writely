"use client";

import { api } from "@/convex/_generated/api";
import {  Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps{
    documentId :Id<"documents">
}
const Banner = ({documentId}:BannerProps) => {
    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore =useMutation(api.documents.restore);

    const onRemove =()=>{
        const promise = remove({id:documentId})
        toast.promise(promise,{
            loading :"Deleting Note..",
            success:"Note deleted!",
            error:"Failed to delete note."
        });
    };

    const onRestore =()=>{
        const promise = restore({id:documentId})
        toast.promise(promise,{
            loading :"Restoring Note..",
            success:"Note restored!",
            error:"Failed to restore note."
        });
    };
    return ( 
        <div>
            Banner
        </div>
     );
}
 
export default Banner;