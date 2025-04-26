
import Logo from './Logo';
const Footer = () => {
    return ( 
    <div className="px-3 flex items-center w-full  bg-background z-50">
       
       <Logo/>
       <div className=" md:ml-auto flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-between md:justify-end w-full">
        <a href="https://www.notion.so/terms" className="hover:underline">Terms</a>
        <a href="https://www.notion.so/privacy" className="hover:underline">Privacy</a>
        <a href="https://www.notion.so/security" className="hover:underline">Security</a>
        <a href="https://www.notion.so/support" className="hover:underline">Support</a>
        </div>
    </div>
     );
}
 
export default Footer;