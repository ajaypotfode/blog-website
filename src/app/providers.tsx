"use client"

import Navbar from "@/component/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation"

interface ProviderProps {
    children: React.ReactNode
}

const queryClient = new QueryClient();

const ProviderWrapper: React.FC<ProviderProps> = ({ children }) => {
    const pathName = usePathname();
    const condition = pathName !== '/login' && pathName !== '/register'

    return (
        <QueryClientProvider client={queryClient}>
            <main className=" border border-red-600 font-serif  ">
                {condition && <Navbar />}
                {children}
            </main>

            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    )
}

export default ProviderWrapper