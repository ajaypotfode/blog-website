"use client";

import Link from "next/link";

const links = [
  { name: "Add blogs", icon: 'bi-plus-square', path: "/admin/addblog" },
  { name: "Blog lists", icon: "bi-file-earmark-text", path: "/admin/blog-list" },
  { name: "Subscribers", icon: "bi-envelope", path: "/admin/subscribers" },
];

interface SidebarProps {
  navigation(value: string): void,
  setSidebar(): void,
  sidebar: boolean
}

export default function Sidebar({ navigation, setSidebar, sidebar }: SidebarProps) {
  // const router = useRouter();
  //   const pathname = usePathname();

  return (
    <div className={` sidebar w-60 bg-gray-200  shadow-md text-black p-6 pr-0 pt-0 border-r inline-block ${sidebar ? "" : "inActive"}  transform  transition-transform duration-300 ease-in-out relative z-10`}>
      <button className="md:hidden absolute right-0 top-0 text-black text-2xl" onClick={setSidebar} >
        <i className="bi bi-toggle-on"></i>
      </button>
      <div className="mobile:text-2xl text-xl font-bold py-7 mb-8 flex items-center ">
        <Link href='/' className="flex items-center gap-2">
          <span className="font-bold mobile:text-4xl text-2xl inline-block"><i className="bi bi-journal-text"></i></span> My Blogs
        </Link>
      </div>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => navigation(link.path)}
            className={
              "flex items-center mobile:text-xl text-md gap-2 px-4 py-2 text-left border border-black transition-all font-bold shadow-effect"
            }
          >
            <i className={`bi ${link.icon} font-bold mobile:text-2xl text-xl`}></i>
            {link.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
