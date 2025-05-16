"use client"
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import {api } from "@/convex/_generated/api";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
const Documentspage = () => {
    const {user}=useUser();
    const router =useRouter();
    const create=useMutation(api.documents.create);
    const handleCreate=()=>{
        const promise = create({title:"Untitled Document"}).then((documentId)=> router.push(`/documents/${documentId}`));
        toast.promise(promise,
            {loading:"Creating a new note...",
            success:"Note created successfully",
            error:"Error creating note"});
    }
    return ( 
        <div className="flex flex-col items-center justify-center h-full">
           <Image src="/empty.webp" alt="Documents" width={300} height={300} className="dark:hidden"  />
           <Image src="/empty-dark.webp" alt="Documents" width={300} height={300} className="hidden dark:block"  />
            <p className="text-lg font-medium">Welcome {user?.username}&apos; Writely</p>
            <Button className="mt-2" onClick={handleCreate}>
                <PlusCircle className="mr-2 " size={20} />Create Document
            </Button>
        </div>
     );
}
 
export default Documentspage;