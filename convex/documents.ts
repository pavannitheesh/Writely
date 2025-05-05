import {v} from "convex/values";
import {mutation,query} from "./_generated/server";
import {Doc,Id} from "./_generated/dataModel";

export const archive=mutation({
    args:{
        id:v.id("documents"),
    },
    handler:async (ctx,args)=>{
        const {id}=args;
        const identity=await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("User not authenticated");
        const userId=identity.subject;
        const document=await ctx.db.get(id);
        if(!document) throw new Error("Document not found");
        if(document.userId!==userId) throw new Error("You are not authorized to archive this document");
        const recursiveArchive=async (docId:Id<"documents">)=>{
            const childDocuments=await ctx.db.query("documents").withIndex("by_parent",(q)=>q
            .eq("userId",userId)
            .eq("parentDocument",docId)
            ).filter((q)=>q.eq(q.field("isArchive"),false)).collect();
            for(const childDocument of childDocuments){
                await ctx.db.patch(childDocument._id,{
                    isArchive:true
                });
                await recursiveArchive(childDocument._id);
            }
        }
        recursiveArchive(id);

        const doc=await ctx.db.patch(id,{
            isArchive:true
        });
        return doc;
    }
})
export const getSidebar=query({
    args:{
        parentDocument:v.optional(v.id("documents")),
    },
    handler:async (ctx,args)=>{
        const {parentDocument}=args;
        const identity=await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("User not authenticated");
        const userId=identity.subject;
        const documents=await ctx.db.query("documents").withIndex("by_parent",(q)=>q
        .eq("userId",userId)
        .eq("parentDocument",parentDocument)
    ).filter((q)=>q.eq(q.field("isArchive"),false)).order("desc").collect();
        return documents;
    }

})
export const create=mutation({
    args:{
        title:v.string(),
        
        parentDocument:v.optional(v.id("documents")),
    },
    handler:async (ctx,args)=>{
        const {title,parentDocument}=args;
        const identity=await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("User not authenticated");
       const userId=identity.subject;
        const document={
            title,
            userId,
            isArchive:false,
            parentDocument,
            content:"",
            coverImage:"",
            icon:"",
            isPublished:false,
        };
        return await ctx.db.insert("documents",document);
    }

})