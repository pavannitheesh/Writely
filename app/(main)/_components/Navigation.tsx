
import { ChevronsLeft } from 'lucide-react';
const Navigation = () => {
    return ( 
       <div>
       <div className="h-full group/sidebar w-60 bg-secondary overflow-y-auto relative flex flex-col z-[99990]">
        <div role="button" className='rounded-xl text-muted-foreground bg-neutral-300 dark:bg-neutral-600 absolute top-3 right-2 cursor-pointer hover:bg-neutral-400 dark:hover:bg-neutral-500 opacity-0 group-hover/sidebar:opacity-100 transition-all duration-200 ease-in-out'>
            <ChevronsLeft className='h-6 w-6 '/>
        </div>
            <div>
                <p>Assests</p>
            </div>
            <div className="mt-2">
                <p>Documents</p>
            </div>
            <div className="opacity-0 group-hover/sidebar:opacity-100 cursor-ew-resize w-1 h-full right-0 top-0 bg-neutral-300 dark:bg-neutral-600 absolute"/>
           
        </div>
        </div>
     );
}
 
export default Navigation;