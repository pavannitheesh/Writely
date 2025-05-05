"use client"
import { Spinner } from '@/components/spinner';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
const TrashBox = () => {
    const router=useRouter();
    const params=useParams();
    const documents = useQuery(api.documents.getArchive);
    const restore=useMutation(api.documents.restore);
    const remove=useMutation(api.documents.remove);

    const [search,setSearch]=React.useState("");

    const filteredDocuments=documents?.filter((document)=>{
        if(!search) return true;
        const title=document.title.toLowerCase();
        const searchTerm=search.toLowerCase();
        return title.includes(searchTerm);
    })
    const onClick=(id:string)=>{
        router.push(`/documents/${id}`);
    }
    const handleRestore =async (e:React.MouseEvent<HTMLDivElement,MouseEvent>,id:Id<"documents">)=>{
        e.stopPropagation();
        const promise = restore({id});
        toast.promise(promise, {
            loading: "Restoring note ...",
            success:  "Restored successfully",
            error: "Error restoring document",
          });
    }
    const handleRemove =async (id:Id<"documents">)=>{
       const promise = remove({id});
        toast.promise(promise, {
            loading: "Deleting note ...",
            success:  "Note Deleted successfully",
            error: "Error removing document",
          });
          if(params.documentId===id){
            router.push("/documents");
          }
    }
        const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
            setSearch(e.target.value);
        }
       if(documents===undefined){
        return (
            <div className='h-full flex items-center justify-center p-4 '>
                <Spinner size="lg" />

            </div>
        )
       }
    return ( 
        <div>
            TrashBox
        </div>
     );
}
 
export default TrashBox;