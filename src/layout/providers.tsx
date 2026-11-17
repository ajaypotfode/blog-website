"use client"

import Navbar from "@/component/Navbar";
// import NotificationPush from "@/component/NotificationPush";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation"
import { Provider as JotaiProvider } from 'jotai'
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
    children: React.ReactNode
}

const queryClient = new QueryClient();

const ProviderWrapper: React.FC<ProviderProps> = ({ children }) => {
    const pathName = usePathname();
    const condition = pathName !== '/login' && pathName !== '/register'

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <JotaiProvider>
                    <main className="  font-serif  ">
                        {condition && <Navbar />}
                        {children}
                    </main>
                </JotaiProvider>
            </SessionProvider>
            {/* <NotificationPush /> */}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    )
}

export default ProviderWrapper