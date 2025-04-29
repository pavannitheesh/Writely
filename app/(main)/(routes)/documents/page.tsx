"use client"
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { PlusCircle } from "lucide-react";
const Documentspage = () => {
    const {user}=useUser();
    console.log(user);
    return ( 
        <div className="flex flex-col items-center justify-center h-full">
           <Image src="/empty.webp" alt="Documents" width={300} height={300} className="dark:hidden"  />
           <Image src="/empty-dark.webp" alt="Documents" width={300} height={300} className="hidden dark:block"  />
            <p className="text-lg font-medium">Welcome {user?.username}&apos; jotion</p>
            <Button className="mt-2">
                <PlusCircle className="mr-2 " size={20} />Create Document
            </Button>
        </div>
     );
}
 
export default Documentspage;