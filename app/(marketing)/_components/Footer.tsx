
import Logo from './Logo';
const Footer = () => {
    return ( 
    <div className="px-3 py-2 flex items-center w-full  bg-background z-50">
       
       <Logo/>
       <div className=" md:ml-auto flex flex-row gap-4 md:gap-8 items-center justify-between md:justify-end w-full">
        <a href="https://www.notion.so/terms" className="hover:underline">Terms & Conditions</a>
        <a href="https://www.notion.so/privacy" className="hover:underline">Privacy Policy</a>

        </div>
    </div>
     );
}
 
export default Footer;