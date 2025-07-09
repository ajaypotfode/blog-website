"use client"
import Sidebar from "@/component/Sidebar";
import UseBlogData from "@/hooks/useBlogData";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { handleAdminNavigation } = UseBlogData()

    return (
        <div className="flex  bg-gray-100 h-full overflow-hidden">
            <Sidebar navigation={handleAdminNavigation} />
            <div className="flex-1 h-screen flex flex-col bg-white relative">
                <div className=" text-black p-4 border-b ">
                    <h1 className="text-2xl font-semibold mb-6 text-center ">Admin Panel</h1>

                </div>
                <div className="flex-1 overflow-y-auto flex items-start flex-col text-center mt-4 px-4 text-black  pb-40 " >
                    {children}
                </div>
            </div>
        </div>
    );
}
