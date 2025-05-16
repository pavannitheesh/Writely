import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from '@/lib/utils';
const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "500"]
});
const Logo = () => {
    return ( 
        <div className="hidden md:flex items-center gap-x-2 ">
            <Image src="/Notion-logo.svg" alt="Notion Logo" width={35} height={35} className="mb-2" />
            <p className={cn("font-semibold",font.className)}>Writely</p>
        </div>
     );
}
 
export default Logo;