import Footer from "./_components/Footer";
import Heading from "./_components/Heading";
import Hero from "./_components/Hero";

export default function MarketingPage() {
  return (
    <div className="min-h-screen flex flex-col dark:bg-[#1F1F1F]">
      <div className="flex-col flex items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading/>
        <Hero/>

      </div>
      <div>
        <Footer/>
      </div>
     
    </div>
  );
}
