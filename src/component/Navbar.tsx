"use client"
import { isLoggedinAtom, userAtom } from '@/atom/userAtom'
import useAuthData from '@/hooks/useAuthData'
// import { isLoggedin } from '@/atom/userAtom'
import { useAtom } from 'jotai'
import { Bookmark, BookOpen, LayoutDashboard, LogOut, PenSquare, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'

const Navbar = () => {
    const [isLoggedin] = useAtom(isLoggedinAtom);
    const [user] = useAtom(userAtom)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { logout } = useAuthData();
    const [isMounted, setIsMounted] = useState(false);
    // const 

    useEffect(() => {
        setIsMounted(true)
    }, [])

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


    if (!isMounted) {
        return (
            <header className="sticky top-0  glass-nav  z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="fixed top-0 left-0 w-full h-1 bg-black animate-pulse" />
                </div>
            </header>
        )
    }

    return (
        <header className="sticky top-0  glass-nav  z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl group-hover:-rotate-12 transition-transform">
                            M
                        </div>
                        <span className="font-serif font-bold text-xl tracking-tight hidden sm:block">MyBlogs</span>
                    </Link>
                </div>

                <nav className="flex items-center space-x-3 sm:space-x-6">
                    {isLoggedin ? (
                        <>
                            <Link href="/admin/add-blog" className="hidden sm:flex items-center space-x-2 text-sm font-medium text-gray-800 hover:text-gray-900 transition-colors rounded-full px-3 py-1.5 hover:bg-gray-200">
                                <PenSquare className="w-4 h-4" />
                                <span>Write</span>
                            </Link>

                            <div className="relative cursor-pointer " ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex text-4xl items-center space-x-2 focus:outline-none rounded-full ring-2 ring-transparent hover:ring-border transition-all"
                                >

                                    <Avatar className='h-10 w-10' src={user?.image ?? ""} fallback={user?.userName || "User"} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-300/50 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                        <div className="px-4 py-3 border-b border-gray-300/50 mb-1">
                                            <p className="text-sm font-semibold text-gray-900">{user?.userName}</p>
                                            <p className="text-xs text-gray-800 truncate">{user?.email}</p>
                                        </div>

                                        <Link href="/admin/add-blog" className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 flex items-center space-x-3 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <PenSquare className="w-4 h-4 text-gray-800" />
                                            <span>Write Blog</span>
                                        </Link>

                                        <Link href="/admin/myFeed" className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 flex items-center space-x-3 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <BookOpen className="w-4 h-4 text-gray-800" />
                                            <span>My Feed</span>
                                        </Link>

                                        <Link href="/admin/blog-list" className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 flex items-center space-x-3 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <LayoutDashboard className="w-4 h-4 text-gray-800" />
                                            <span>My Stories</span>
                                        </Link>


                                        <Link href="/admin/saved" className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 flex items-center space-x-3 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <Bookmark className="w-4 h-4 text-gray-800" />
                                            <span>Saved Blogs</span>
                                        </Link>

                                        <Link href="/admin/subscribers" className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 flex items-center space-x-3 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <Users className="w-4 h-4 text-gray-800" />
                                            <span>Subscribers</span>
                                        </Link>

                                        {/* <Link href="/admin" className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 flex items-center space-x-3 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <Settings className="w-4 h-4 text-gray-800" />
                                            <span>Admin Panel</span>
                                        </Link> */}

                                        <div className="h-px bg-border/50 my-1 mx-2"></div>

                                        <button
                                            onClick={logout}
                                            className=" cursor-pointer w-full text-left px-4 py-2 text-sm text-destructive hover:bg-red-300/10 flex items-center space-x-3 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium text-gray-800 hover:text-gray-900 transition-colors">
                                Sign In
                            </Link>
                            <Link href="/register" className="hidden sm:inline-block">
                                <button className="rounded-full px-6">Get Started</button>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>

    )
}

export default Navbar