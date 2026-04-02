import { upload } from "@vercel/blob/client";


export const uploadImage = async (file: File) => {

    let percentage = 0

    // try {
    const newBlob = await upload(`blog-platform/${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
        onUploadProgress: (e) => {
            percentage = e.percentage
            // console.log("loading Percent Is :", e.percentage, e.loaded);

        }
    });
    return { percentage, newBlob }
}