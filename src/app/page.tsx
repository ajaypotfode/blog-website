"use client"
import { allBlogsAtom, categoriesAtom, categoryAtom, filteredBlogAtom, searchInputAtom } from "@/atom/blogsAtom";
import { openToastAtom } from "@/atom/toastAtom";
import BlogCard from "@/component/BlogCard";
import { SmallComponentSpinner } from "@/component/Loaders";
// import { useLoginUserMutation } from "@/mutation/authMutation";
import { useGetBlogsMutation } from "@/mutation/blogMutation";
// import { Blog } from "@/schema/BlogSchema";
import { useAtom, useSetAtom } from "jotai";
import { BookOpen, Search, X } from "lucide-react";
// import { Search } from "lucide-react";
import { useEffect } from "react";


export default function Home() {
  const setAllBlogs = useSetAtom(allBlogsAtom);
  const [search, setSearch] = useAtom(searchInputAtom)
  const openToast = useSetAtom(openToastAtom);
  const [filteredBlogs] = useAtom(filteredBlogAtom);
  const [category, setCategory] = useAtom(categoryAtom)
  const [categories] = useAtom(categoriesAtom)
  // const { fetchBlogs, blogs, handleAddBlog, loading, activeCategory, setActiveCategory, isLogedIn } = UseBlogData()
  // const { getLogoutUser, setIsUserLogedin } = UseAuthData()
  const { mutate, isPending, variables: searchQuery, error } = useGetBlogsMutation();

  const fetchBlogs = (searchString?: string) => {
    const params = searchString?.trim() !== '' ? searchString : undefined
    mutate(
      params,
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


  const clearSearch = () => {
    setCategory('all');
    setSearch('')
    fetchBlogs()
  }

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

        <form onSubmit={(e) => { e.preventDefault(); fetchBlogs(search); }} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              // ref={searchInputRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search stories, topics, or authors..."
              className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-border hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-full outline-none transition-all placeholder:text-muted-foreground shadow-sm"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={isPending || search.trim() === ''}
            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-black text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity shadow-sm"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>

        {/* Category pills — hidden while search results are showing */}
        {!searchQuery && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setCategory('all')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${category === 'all'
                ? "bg-black text-white shadow-md"
                : "bg-white border border-border text-muted-foreground hover:bg-gray-100"
                }`}
            >
              For You
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat
                  ? "bg-black text-white shadow-md"
                  : "bg-white border border-border  hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Search results label */}
        {searchQuery && (
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground">
              Results for <span className="text-blue-600">{searchQuery}</span>
            </h2>
            {!isPending && (
              <span className="text-sm text-muted-foreground">
                — {filteredBlogs.length === 0 ? "no stories found" : `${filteredBlogs.length} ${filteredBlogs.length === 1 ? "story" : "stories"}`}
              </span>
            )}
            <button
              onClick={clearSearch}
              className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground border border-border rounded-full px-2.5 py-1 transition-colors"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          </div>
        )}
        </div>

        {isPending ? (
          <div className="flex flex-col items-center justify-center py-20">
            <SmallComponentSpinner />
            <p className="text-muted-foreground">
              {searchQuery ? `Searching for "${searchQuery}"...` : "Discovering great stories..."}
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-red-100">
            <p className="text-destructive mb-2">Failed to load stories.</p>
            <button className="button" onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-border/50 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">No stories found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? `We couldn't find any stories matching "${searchQuery}".`
                : "We couldn't find any stories in this category right now."}
            </p>
            {searchQuery ? (
              <button className="button" onClick={clearSearch}>Clear search</button>
            ) : (
              <button className="button" onClick={() => setCategory('all')}>Clear Filter</button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
              />
            ))}
          </div>
        )}
    </section >
  </>

  );
}
