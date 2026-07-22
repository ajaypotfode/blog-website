// import BlogModel from "@/schema/BlogSchema";
// import { Types } from "mongoose";
// import { unstable_cache } from "next/cache";

// export const getAdminBlogs = (userId: Types.ObjectId, lastId: string | null) => unstable_cache(
//     async () => {
//         return await BlogModel.find({
//             author: userId,
//             ...(lastId && { _id: { $lt: new Types.ObjectId(lastId) } })
//         })
//             .sort({ _id: -1 })
//             .limit(10)
//             .populate("author", "userName image")
//     },
//     [`admin-blogs-${userId}-${lastId}`],
//     {
//         tags: [`admin-blogs-${userId}`], //dynamic Tag
//         revalidate: 360,
//     },

// )();