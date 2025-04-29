const UserItem = () => {
    return ( 
        <div>
            <div className="flex items-center justify-between p-4 border-b dark:border-[#2F2F2F]">
                <div className="flex items-center space-x-4">
                    {/* <img src="/user.webp" alt="User" className="w-10 h-10 rounded-full" /> */}
                    <div className="flex flex-col">
                        <p className="text-sm font-medium">John Doe</p>
                    </div>
                </div>  
                </div>  
        </div>
     );
}
 
export default UserItem;