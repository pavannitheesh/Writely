const RootLayout= ({children}:{children:React.ReactNode}) => {
    return ( 
        <div className="bg-red-600 h-full text-white">
            {children}
        </div>
     );
}
 
export default RootLayout;