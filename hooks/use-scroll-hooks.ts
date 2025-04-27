
import React from "react";

const useScroll = (theshold:number) => {
    const [scrolled, setScrolled] = React.useState(false);
    React.useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY > theshold) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    },[]);
    
    return scrolled;
}
 
export default useScroll;