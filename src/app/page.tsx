"use client"
import Card from "@/component/Card";
import { PageSpinner } from "@/component/Loaders";
import UseAuthData from "@/hooks/useAuthData";
import UseBlogData from "@/hooks/useBlogData";
import Link from "next/link";
import { useEffect } from "react";
import Cookies from 'js-cookie'

export default function Home() {
  const { fetchBlogs, blogs, handleAddBlog, loading, activeCategory, setActiveCategory, isLogedIn } = UseBlogData()
  const { getLogoutUser, setIsUserLogedin } = UseAuthData()


  useEffect(() => {
    fetchBlogs("all")
    const isVerified = Cookies.get('isLogedin')

    if (isVerified) {
      setIsUserLogedin(JSON.parse(isVerified))
    } else {
      setIsUserLogedin(false)
    }
  }, [])


  return (
    <div className="h-screen flex flex-col bg-gray-200  overflow-y-auto  overflow-x-hidden">
      <header className="flex justify-between items-center mobile:px-6 px-4 py-4 text-black">
        <div className="mobile:text-2xl text-xl font-bold flex items-center space-x-2">
          <span className="font-bold mobile:text-4xl text-2xl"><i className="bi bi-journal-text"></i></span>
          <span>My Blogs</span>
        </div>
        <div className="flex mobile:gap-4 gap-2">
          <button className="mobile:px-4 py-2 px-2 sm:text-lg mobile:text-md text-xs bg-black text-white rounded hover:bg-gray-800 h-fit cursor-pointer whitespace-nowrap"
            onClick={handleAddBlog}>
            Admin Panel
          </button>
          {
            !isLogedIn ? <Link href='/login' className="mobile:px-4 py-2 px-2 sm:text-lg mobile:text-md text-xs bg-black text-white rounded hover:bg-gray-800 h-fit">Login</Link>
              : <button className="mobile:px-4 py-2 px-2 sm:text-lg mobile:text-md text-xs bg-black text-white rounded hover:bg-gray-800 h-fit cursor-pointer" onClick={() => getLogoutUser()}>LogOut</button>
          }

        </div>
      </header>
      <section className="flex-1 flex flex-col items-center text-center mt-4 px-4 text-black">
        <h1 className="md:text-4xl mobile:text-3xl text-2xl font-bold">Latest Blogs</h1>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto sm:text-lg mobile:text-md text-xs ">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever.
        </p>
        <div className="mt-10 flex justify-center sm:text-lg mobile:text-md text-xs sm:space-x-6 space-x-3 overflow-x-auto">
          {["all", "music", "games", "sports"].map((item, idx) => (
            <button
              key={item}
              className={`mobile:px-4 px-2 py-1 rounded ${idx === activeCategory ? "bg-black text-white" : "text-black cursor-pointer"
                }`}
              onClick={() => {
                fetchBlogs(item)
                setActiveCategory(idx)
              }
              }
            >
              {item}
            </button>
          ))}
        </div>
        {
          loading["getBlogs"] ?
            <div className="flex flex-1  justify-center items-center sm:grid-cols-2 gap-8 mt-10 px-6 pb-20  w-full">
              <PageSpinner />
            </div> : (
              blogs.length > 0 ?
                <div className="flex flex-wrap justify-center items-center lg:gap-8 md:gap-4 gap-y-5 mt-10 lg:px-6 md:px-4 pb-20  w-full">
                  <Card blogs={blogs} />
                </div> :
                <div className="flex flex-1  justify-center items-center sm:grid-cols-2 gap-8 mt-10 px-6 pb-20  w-full">
                  <h2 className="font-bold text-4xl">
                    No Blogs Available!!!!
                  </h2>
                </div>
            )
        }
      </section>
    </div>

  );
}
