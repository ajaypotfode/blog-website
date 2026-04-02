"use client"
import { allBlogsAtom, categoriesAtom, categoryAtom, filteredBlogAtom } from "@/atom/blogsAtom";
import { openToastAtom } from "@/atom/toastAtom";
import BlogCard from "@/component/BlogCard";
import { SmallComponentSpinner } from "@/component/Loaders";
// import { useLoginUserMutation } from "@/mutation/authMutation";
import { useGetBlogsMutation } from "@/mutation/blogMutation";
// import { Blog } from "@/schema/BlogSchema";
import { useAtom, useSetAtom } from "jotai";
// import { Search } from "lucide-react";
import { useEffect } from "react";


export default function Home() {
  const setAllBlogs = useSetAtom(allBlogsAtom);
  const openToast = useSetAtom(openToastAtom);
  const [filteredBlogs] = useAtom(filteredBlogAtom);
  const [category, setCategory] = useAtom(categoryAtom)
  const [categories] = useAtom(categoriesAtom)
  // const { fetchBlogs, blogs, handleAddBlog, loading, activeCategory, setActiveCategory, isLogedIn } = UseBlogData()
  // const { getLogoutUser, setIsUserLogedin } = UseAuthData()
  const { mutate, isPending } = useGetBlogsMutation();

  const fetchBlogs = () => {
    mutate(
      undefined,
      {
        onSuccess: (data) => {
          setAllBlogs(data.result)
        },
        onError: (err: Error) => {
          openToast({ type: "error", message: err.message || "Failed To Fetch Blogs" })
        }
      },
    );
  }

  useEffect(() => {
    fetchBlogs();
  }, [])


  return (<>
    <section className="relative overflow-hidden bg-white border-b border-gray-300/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center text-start">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-primary leading-[1.1] mb-6">
              Discover Stories, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Ideas</span>, and Knowledge.
            </h1>
            <p className="text-lg md:text-xl text-gray-800 mb-8 leading-relaxed max-w-lg ">
              Explore a world of thought-provoking articles from writers on topics ranging from technology to life lessons.
            </p>
            {/* <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button  className="rounded-full text-base px-8 h-14" onClick={() => {
                  document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Start Reading
                </button>
                <button  className="rounded-full text-base px-8 h-14 bg-white/50 backdrop-blur-sm">
                  Become a Writer
                </button>
              </div> */}
          </div>

          <div
            className="hidden md:block relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={`image/blog-hero-image.jpg`}
                alt="Reading illustration"
                className="w-full h-auto object-cover aspect-[4/3] bg-blue-50"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1455390582262-044cdead2708?w=1200&q=80";
                }}
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-purple-100 opacity-50 blur-2xl -z-10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
    <section id="explore-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="sticky top-16 z-40 bg-gray-50/95 backdrop-blur-md -mx-4 px-4 sm:mx-0 sm:px-0 pt-4 pb-3 mb-8 space-y-3">

        {/* Search bar */}
        {/* <form className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800 pointer-events-none" />
              <input
                // ref={searchInputRef}
                type="text"
                // value={inputValue}
                // onChange={e => setInputValue(e.target.value)}
                placeholder="Search stories, topics, or authors..."
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-gray-300 hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-full outline-none transition-all placeholder:text-gray-800 shadow-sm"
              /> */}
        {/* {inputValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-800 hover:text-gray-900 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )} */}
        {/* </div>
            <button
              type="submit"
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:opacity-90 transition-opacity shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form> */}

        {/* Category pills — hidden while search results are showing */}
        {/* {!searchQuery && ( */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-hide">
          {["all", ...categories].map((item) => (
            <button
              key={item}
              className={`mobile:px-4 px-2 py-1 rounded ${item === category ? "bg-black text-white" : "text-black cursor-pointer"}`}
              onClick={() => {
                setCategory(item)
              }
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full max-w-7xl mt-10 lg:px-6 md:px-4 pb-20">
        {
          isPending ?
            <div className="flex flex-col items-center justify-center py-20">
              <SmallComponentSpinner />
              <p className="text-gray-800">Discovering great stories...</p>
            </div> : (
              filteredBlogs.length > 0 ?
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {
                    filteredBlogs.map((blog, index) => (
                      <BlogCard key={index} blog={blog} />
                    ))
                  }
                </div> :
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-200/50 w-full shadow-sm">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="w-6 h-6 text-gray-800">
                      <i className="bi bi-book"></i>
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2">No stories found</h3>
                  <p className="text-gray-800 mb-6">We could not find any stories in this category right now.</p>
                  {/* <Button variant="outline" onClick={() => setSelectedCategory(undefined)}>Clear Filter</Button> */}
                </div>

            )
        }
      </div>
    </section>
  </>

  );
}
