"use client"
import React from 'react';
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from 'lucide-react';
import {useMediaQuery} from 'usehooks-ts';
import {cn} from "@/lib/utils";
import { usePathname } from 'next/navigation';
import UserItem from './UserItem';
import { useMutation} from 'convex/react';
import { api } from '@/convex/_generated/api';
import Item from './Item';
import { toast } from 'sonner';
import { DocumentList } from './Document-list';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import TrashBox from './TrashBox';
const Navigation = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const navbarRef = React.useRef<HTMLDivElement>(null);
    const isResizingRef = React.useRef(false);
    const pathname = usePathname();
    const [isCollapse, setIsCollapse] = React.useState(false);
    const [isResetting,setIsResetting]=React.useState(false);
    const create=useMutation(api.documents.create);
    React.useEffect(() => {
        if (isMobile) {
            handleCollapse();
        } else {
           handleReset();
        }
    }, [isMobile,]);
    React.useEffect(() => {
        if (isMobile) {
            handleCollapse();
        } 
    }, [pathname]); 
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement,MouseEvent>) => {
       e.preventDefault();
       e.stopPropagation();
         isResizingRef.current = true;
         document.addEventListener("mousemove", handleMouseMove);
         document.addEventListener("mouseup", handleMouseUp);
    };
    const handleMouseMove = (e: MouseEvent) => {
        if (isResizingRef.current) {
            let newWidth = e.clientX;
            if(newWidth<240) newWidth=240;
            if(newWidth>480) newWidth=480;
            if(sidebarRef && navbarRef){
                sidebarRef.current!.style.width = `${newWidth}px`;
                navbarRef.current!.style.left = `${newWidth}px`;
                navbarRef.current!.style.width = `calc(100% - ${newWidth}px)`;
        }
    }
}
        const handleMouseUp = () => {
            isResizingRef.current = false;
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
        const handleCollapse = () => {
            setIsResetting(true);
            setIsCollapse(true);
            sidebarRef.current!.style.width = "0px";
            navbarRef.current!.style.left = "0px";
            navbarRef.current!.style.width = "100%";
            setTimeout(() => {
                setIsResetting(false);
            }, 300);
        }
        const handleReset = () => {
            setIsResetting(true);
            setIsCollapse(false);
            sidebarRef.current!.style.width = "240px";
            navbarRef.current!.style.left = "240px";
            navbarRef.current!.style.width = `calc(100% - 240px)`;
            setTimeout(() => {
                setIsResetting(false);
            }, 300);
        }
        const handleCreate = async () => {
            const promise = create({title:"Untitled Document"});
            toast.promise(promise,
                {loading:"Creating a new note...",
                success:"Note created successfully",
                error:"Error creating note"});
        }


    return ( 
       <div>
       <div ref={sidebarRef} className={cn("h-full group/sidebar w-60 bg-secondary overflow-y-auto relative flex flex-col z-[999]",
        isResetting && "transition-all duration-300 ease-in-out",
        isMobile && "w-0",
       )}>
        <div role="button" className={cn('rounded-xl text-muted-foreground bg-neutral-300 dark:bg-neutral-600 absolute top-3 right-2 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-500 opacity-0 group-hover/sidebar:opacity-100 transition-all duration-200 ease-in-out',isMobile && "opacity-100")} onClick={handleCollapse}>
            <ChevronsLeft className='h-6 w-6 '/>
        </div>
            <div>
               <UserItem/>
               <Item
                onClick={()=>{}}
                icon={Search}
                label="Search"
                isSearch={true}
                />
               <Item
                onClick={()=>{}}
                icon={Settings}
                label="Settings"
                />
               <Item
                onClick={handleCreate}
                icon={PlusCircle}
                label="Create New Document"
                />
            </div>
            <div className="mt-4">
                <DocumentList/>
                <Item
                    onClick={handleCreate}
                    icon={Plus}
                    label="Add a Page"/>
                    <Popover>
                        <PopoverTrigger className='w-full mt-4'>
                            <Item label="Trash" icon={Trash}/>
                        </PopoverTrigger>
                        <PopoverContent side={isMobile ? "bottom" : "right"} className="w-70">
                            <TrashBox/>
                        </PopoverContent>
                    </Popover>

            </div>
            <div onMouseDown={handleMouseDown} onClick={handleReset} className="opacity-0 group-hover/sidebar:opacity-100 cursor-ew-resize w-1 h-full right-0 top-0 bg-neutral-300 dark:bg-neutral-600 absolute"/>
           
        </div>
        <div ref={navbarRef} className={cn('left-60 z-[99999] w-[calc(100%-240px)] absolute top-0',isMobile && "left-0 w-full",isResetting && "transition-all duration-300 ease-in-out")}>
            <nav className='bg-transparent px-3 py-2 w-full'>
                   {isCollapse && <MenuIcon className='h-6 w-6 text-muted-foreground' onClick={handleReset}/>}
            </nav>
        </div>
        </div>
     );
}
 
export default Navigation;