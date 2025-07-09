"use client";

import Link from "next/link";

const links = [
  { name: "Add blogs", icon: 'bi-plus-square', path: "/admin/addblog" },
  { name: "Blog lists", icon: "bi-file-earmark-text", path: "/admin/blog-list" },
  { name: "Subscribers", icon: "bi-envelope", path: "/admin/subscribers" },
];

export default function Sidebar({ navigation }: { navigation: (route: string) => void }) {
  // const router = useRouter();
  //   const pathname = usePathname();

  return (
    <div className="w-60 bg-gray-200  shadow-md text-black p-6 pr-0 pt-0 border-r inline-block">
      <div className="text-2xl font-bold py-7 mb-8 flex items-center ">
        <Link href='/' className="flex items-center gap-2">
          <span className="font-bold text-4xl inline-block"><i className="bi bi-journal-text"></i></span> My Blogs
        </Link>
      </div>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => navigation(link.path)}
            className={
              "flex items-center gap-2 px-4 py-2 text-left border border-black transition-all font-bold shadow-effect"
            }
          >
            <i className={`bi ${link.icon} font-bold text-2xl`}></i>
            {link.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
