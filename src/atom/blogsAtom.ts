import { BlogResult, Comment } from '@/types/BlogTypes';
import { atom } from 'jotai';



export const allBlogsAtom = atom<BlogResult[]>([]);
export const categoriesAtom = atom(["Technology", "Design", "Culture", "Programming", "Business", "Music", "Sports", "Games"]);
export const blogAtom = atom<BlogResult | null>(null);
export const commentsAtom = atom<Comment[]>([]);
export const commentDataAtom = atom({
    comment: "",
    category: ""
});
export const totalCommentsAtom = atom<number>(0)

export const categoryAtom = atom("all")

export const filteredBlogAtom = atom<BlogResult[]>(
    (get) => {
        const category = get(categoryAtom)
        const allBlogs = get(allBlogsAtom);
        if (category === 'all') return allBlogs
        return allBlogs.filter(blog => blog.category === category);

    }
)
