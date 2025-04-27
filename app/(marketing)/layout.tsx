import Navbar from "./_components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="h-full">
    <Navbar/>
    <main className="pt-20 h-full">

       {children}
    </main>

   </div>
     
  );
}
