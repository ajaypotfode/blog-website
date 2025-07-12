"use client"
import Sidebar from "@/component/Sidebar";
import UseBlogData from "@/hooks/useBlogData";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { handleAdminNavigation, sidebar, setSidebar } = UseBlogData()

    return (
        <div className="flex bg-gray-100 h-full overflow-hidden">
            <Sidebar sidebar={sidebar} setSidebar={setSidebar} navigation={handleAdminNavigation} />
            <div className="flex-1 h-screen flex flex-col bg-white relative w-full">
                <div className=" text-black md:p-4 p-2 border-b relative ">
                    <button className="md:hidden absolute top-2 left-4  text-black text-2xl font-bold" onClick={setSidebar} >
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <h1 className="mobile:text-2xl text-xl font-semibold mobile:mb-6 mb-3 text-center ">Admin Panel</h1>
                </div>
                <div className="flex-1 overflow-y-auto flex items-start flex-col text-center mt-4 px-4 text-black  pb-40 " >
                    {children}
                </div>
            </div>
        </div>
    );
}
