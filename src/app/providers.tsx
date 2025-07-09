"use client"

import store from "@/redux/store"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"
import { Provider } from "react-redux"
import { toast } from "react-toastify"

interface ProviderProps {
    children: React.ReactNode
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
    const searchparams = useSearchParams()
    const error = searchparams.get('error')
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // console.log();

        if (error === 'login_required') {
            toast.error("create Your Blog Account or Login First")
            router.replace(pathname)
        }

    }, [error, pathname])

    return (
        <Provider store={store}>{children}</Provider>
    )
}



const ProviderWrapper: React.FC<ProviderProps> = ({ children }) => {
    return (
        <Suspense>
            <Providers>{children} </Providers>
        </Suspense>
    )
}

export default ProviderWrapper