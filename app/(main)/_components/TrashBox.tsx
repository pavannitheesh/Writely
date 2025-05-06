"use client"
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { useMutation, useQuery } from 'convex/react';
import {  Search, Trash, Undo } from 'lucide-react';
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
    const handleRestore =async (e:React.MouseEvent<HTMLButtonElement,MouseEvent>,id:Id<"documents">)=>{
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
        <div className="text-sm">
            <div className='flex items-center gap-x-2 p-2'>
                <Search className='h-4 w-4 text-gray-500'/>
                <Input
                 value={search}
                 onChange={(e)=>setSearch(e.target.value)}
                    placeholder='Filter by page title..'
                 />
            </div>
            <div className={cn(
                'mt-2 px-2',
                filteredDocuments?.length === 0 ? 'h-24' : 'max-h-[450px] overflow-y-auto'
            )}>
                <p className='hidden last:block text-center text-mute-foreground pb-2'>
                    No Documents found.
                </p>
                {filteredDocuments?.map((document)=>(
                    <div key={document._id} role="button" className='flex items-center text-neutral-500 font-semibold justify-between mt-1 hover:bg-primary/5 rounded-md cursor-pointer w-full' onClick={()=>onClick(document._id)}>
                            <span className='truncate pl-2'>{document.title}</span>
                        <div className='flex items-center gap-x-2'>
                            <Button variant="ghost" onClick={(e)=>handleRestore(e,document._id)} className='rounded-sm hover:bg-neutral-200'>
                                <Undo className='h-4 w-4 text-muted-foreground'/>
                            </Button>
                           <ConfirmModal onConfirm={()=>handleRemove(document._id)}>
                                <Button  onClick={(e) => e.stopPropagation()} variant="ghost" className='rounded-sm hover:bg-neutral-200'>
                                    <Trash className='h-4 w-4 text-muted-foreground'/>
                                </Button>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}

            </div>
        </div>
     );
}
 
export default TrashBox;