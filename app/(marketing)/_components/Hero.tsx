import Image from "next/image";
const Hero = () => {
    return ( 
        <div className="flex flex-col justify-cneter items-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[450px] h-[250px] md:w-[700px] md:h-[350px]">
                <Image
                    src="/hero.png"
                    fill
                    alt="hero"
                    className="object-contain"
                    />

                </div>

            </div>


        </div>
     );
}
 
export default Hero;