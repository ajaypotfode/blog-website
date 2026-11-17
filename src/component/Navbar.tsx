"use client"
import { loggedinUserAtom} from '@/atom/userAtom'
// import useAuthData from '@/hooks/useAuthData'
// import { isLoggedin } from '@/atom/userAtom'
import {  useSetAtom } from 'jotai'
import { Bookmark, BookOpen, LayoutDashboard, LogOut, PenSquare, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
// import { SmallComponentSpinner } from './Loaders'
import { signOut, useSession } from 'next-auth/react'
import ThemeToggle from './toggleTheme'

const Navbar = () => {
    // const [_, setIsLoggedIn] = useAtom(loggedinUserAtom);
    const setLoggedinUser=useSetAtom(loggedinUserAtom);
    // const [user] = useAtom(userAtom)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    // const { logout, isPending } = useAuthData();
    const { data: session, status } = useSession()
    // const [isMounted, setIsMounted] = useState(false);
    // // const 

    useEffect(() => {
        if (!isDropdownOpen) return;
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isDropdownOpen]);

    useEffect(() => {
        if (session) {
           setLoggedinUser({
                name: session.user.name ?? "",
                email: session.user.email!,
                image: session.user.image ?? "",
                id: session.user.id
            })
        }
    }, [session])


    const handleLogout = async () => {
        await signOut({
            callbackUrl: "/login" // Where to send the user after logging out
        })
    }

    if (status === "loading") {
        return (
            <header className="sticky top-0  glass-nav  z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="fixed top-0 left-0 w-full h-1 bg-primary animate-pulse" />
                </div>
            </header>
        )
    }

    return (
        <header className="sticky top-0  glass-nav  z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-serif font-bold text-xl group-hover:-rotate-12 transition-transform">
                            M
                        </div>
                        <span className="font-serif font-bold text-xl tracking-tight hidden sm:block">MyBlogs</span>
                    </Link>
                </div>

                <nav className="flex items-center space-x-3 sm:space-x-6">
                    <ThemeToggle/>
                    {session ? (
                        <>
                            <Link href="/admin/add-blog" className="hidden sm:flex items-center space-x-2 text-sm font-medium text-disabled hover:text-primary transition-colors rounded-full px-3 py-1.5 hover:bg-surface-secondary">
                                <PenSquare className="w-4 h-4" />
                                <span>Write</span>
                            </Link>

                            <div className="relative cursor-pointer " ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex text-4xl items-center space-x-2 focus:outline-none rounded-full ring-2 ring-transparent hover:ring-border transition-all cursor-pointer "
                                >

                                    <Avatar className='h-10 w-10' src={session?.user.image ?? ""} fallback={session.user?.name || "User"} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-60 bg-surface rounded-xl shadow-lg border border-border/50 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                        <div className="px-4 py-3 border-b border-border/50 mb-1">
                                            <p className="text-sm font-semibold text-primary">{session.user?.name}</p>
                                            <p className="text-xs text-disabled truncate">{session.user?.email}</p>
                                        </div>

                                        <Link href="/admin/add-blog" className="px-4 py-2 text-sm text-primary hover:bg-surface-secondary flex items-center space-x-3 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <PenSquare className="w-4 h-4 text-disabled" />
                                            <span>Write Blog</span>
                                        </Link>

                                        <Link href="/admin/myFeed" className="px-4 py-2 text-sm text-primary hover:bg-surface-secondary flex items-center space-x-3 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <BookOpen className="w-4 h-4 text-disabled" />
                                            <span>My Feed</span>
                                        </Link>

                                        <Link href="/admin/blog-list" className="px-4 py-2 text-sm text-primary hover:bg-surface-secondary flex items-center space-x-3 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <LayoutDashboard className="w-4 h-4 text-disabled" />
                                            <span>My Stories</span>
                                        </Link>


                                        <Link href="/admin/saved" className="px-4 py-2 text-sm text-primary hover:bg-surface-secondary flex items-center space-x-3 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <Bookmark className="w-4 h-4 text-disabled" />
                                            <span>Saved Blogs</span>
                                        </Link>

                                        <Link href="/admin/subscribers" className="px-4 py-2 text-sm text-primary hover:bg-surface-secondary flex items-center space-x-3 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <Users className="w-4 h-4 text-disabled" />
                                            <span>Subscribers</span>
                                        </Link>

                                        {/* <Link href="/admin" className="px-4 py-2 text-sm text-primary hover:bg-surface-secondary flex items-center space-x-3 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <Settings className="w-4 h-4 text-disabled" />
                                            <span>Admin Panel</span>
                                        </Link> */}

                                        <div className="h-px border-border/50 my-1 mx-2"></div>

                                        <button
                                            onClick={handleLogout}
                                            // disabled={isPending}
                                            className=" cursor-pointer w-full text-left px-4 py-2 text-sm text-destructive hover:bg-red-300/10 flex items-center space-x-3 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Sign Out</span>
                                            {/* {isPending && <SmallComponentSpinner />} */}
                                        </button>
                                    </div>
                                )}

                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium text-disabled hover:text-primary transition-colors rounded-full px-3 py-1.5 hover:bg-surface-secondary">
                                Sign In
                            </Link>
                            <Link href="/register" className="hidden sm:inline-block">
                                <button className="button">Get Started</button>
                            </Link>
                        </>
                    )}

                </nav>
            </div>
        </header>

    )
}

export default Navbar