import {v} from "convex/values";
import {mutation,query} from "./_generated/server";
import {Doc,Id} from "./_generated/dataModel";
// export const get=query({
//     handler:async (ctx)=>{
//         const identity=await ctx.auth.getUserIdentity();
//         if(!identity) throw new Error("User not authenticated");
//         const documents=await ctx.db.query("documents").collect();
//         return documents;
//     }
// })
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