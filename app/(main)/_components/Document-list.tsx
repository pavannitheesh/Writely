"use client";

import { api } from "@/convex/_generated/api";
import { Id,Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Item from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentsListprops{
    parentDocumentId?:Id<"documents">,
    level?:number,
    data?:Doc<"documents">[]
}
export const DocumentList = (
    {
        parentDocumentId,level=0
    }
:DocumentsListprops) => {
    const params=useParams();
    const router=useRouter();
    const [expanded,setExpanded]=React.useState<Record<string,boolean>>({});

    const onExpand=(documentId:string)=>{
        setExpanded(prev=>({
            ...prev,[documentId]:!prev[documentId]
        }))

    }
    const documents=useQuery(api.documents.getSidebar,{
        parentDocument:parentDocumentId
    });
    const onRedirect=(documentId:string)=>{
        router.push(`/documents/${documentId}`);
    }
    if(documents==undefined){
        return (
            <>
            <Item.Skeleton level={level}/>
            {level===0 && (
                <>
                <Item.Skeleton level={level}/>
                <Item.Skeleton level={level}/>
                </>
        )}
        </>
        )
    }
    return (
       <>
       <p style={{
        paddingLeft:level? `${(level*23)+25}px`:undefined
       }}
       className={cn("hidden text-sm text-muted-foreground/80 font-medium",
        expanded && "last:block",
        level===0 && "hidden"
       )}
       >No pages Inside</p>
       {
        documents.map((document)=>(
            <div key={document._id}>
                <Item
                label={document.title}
                id={document._id}
                onClick={()=>onRedirect(document._id)}
                icon={FileIcon}
                documentIcon={document.icon}
                level={level}
                active={params.documentId===document._id}
                onExpand={()=>{onExpand(document._id)}}
                expanded={expanded[document._id]}

                />
            {
                expanded[document._id] && 
                <DocumentList
                parentDocumentId={document._id}
                level={level+1 }
                />
            }
            </div>
        )

        )
       }
       </>
    )
}