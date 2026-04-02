import { BlogResult, SavedBlogResult } from "@/types/BlogTypes";
import { SubscriberResult } from "@/types/SubscriberType";
import { atom } from "jotai";

export const blogsAtom = atom<BlogResult[]>([]);
export const topstoriesAtom = atom<BlogResult[]>([]);
export const categoriesAtom = atom(["Technology", "Design", "Culture", "Programming", "Business", "Music", "Sports", "Games"]);
export const blogDataAtom = atom({
    title: '',
    image: "",
    content: "",
    description: "",
    category: ""
});

export const formErrorsAtom = atom({
    title: '',
    image: "",
    content: "",
    description: "",
    category: ""
});
export const recomendedBlogsAtom = atom<BlogResult[]>([]);
export const trendingBlogsAtom = atom<BlogResult[]>([]);
export const savedBlogsAtom = atom<SavedBlogResult[]>([]);
export const subscribersAtom = atom<SubscriberResult[]>([]);
export const totalSavedBlogsAtom = atom<number>(0);
export const totalSubscribersAtom = atom<number>(0);
export const totalAdminBlogsAtom = atom<number>(0);
