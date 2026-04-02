"use client"

import { blogDataAtom, categoriesAtom, formErrorsAtom } from "@/atom/adminBlogAtom";
import { openToastAtom } from "@/atom/toastAtom";
import { SmallComponentSpinner } from "@/component/Loaders";
import blogFormValidate from "@/formValidation/blogFormvalidate"
import { useAddBlogMutation } from "@/mutation/adminBlogMutation";
import { useAtom, useSetAtom } from "jotai";
import { ImageIcon, Link } from "lucide-react";
import React, { useRef, useState } from "react";
import Editor, {
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    HtmlButton,
    Separator,
    Toolbar
} from 'react-simple-wysiwyg';
import { useUploadImageMutation } from "@/mutation/uploadImageMutation";

const AddBlog = () => {
    const openToast = useSetAtom(openToastAtom)
    const [categories] = useAtom(categoriesAtom);
    const [blogdata, setBlogdata] = useAtom(blogDataAtom);
    const [formErrors, setFormErrors] = useAtom(formErrorsAtom);
    const { isPending: isAddblogPending, mutate: addBlog } = useAddBlogMutation();
    const { isPending: imageUploadPending, mutate: uploadImage } = useUploadImageMutation();
    const inputFileRef = useRef<HTMLInputElement>(null);
    // const [imageFile, setImageFile] = useState<File | null>(null)
    const [displayImage, setDisplayImage] = useState<string | null>(null)


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { validate, blogErrors } = blogFormValidate(blogdata);
        setFormErrors(blogErrors)

        if (isAddblogPending || !validate) return;

        // const payload = {
        //     title: blogdata.title,
        //     category: blogdata.category,
        //     image: '/image',
        //     description: blogdata.description,
        //     content: blogdata.content
        // }

        addBlog(
            blogdata,
            {
                onSuccess: () => {
                    openToast({ type: "success", message: "Blog Created Successfully!!" })
                    setBlogdata({ title: "", category: "", image: "", description: "", content: "" });
                    setDisplayImage("");
                    if (inputFileRef.current?.value) { inputFileRef.current.value = "" }

                },
                onError: (err: Error) => {
                    console.log("erro is :", err.message);
                    openToast({ type: "error", message: err.message || "Failed To Create Blog" })
                }
            })
    }



    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        uploadImage(
            e.target.files[0],
            {
                onSuccess: (data) => {
                    setDisplayImage(data.newBlob.url);
                    setBlogdata({ ...blogdata, image: data.newBlob.url })
                },
                onError: (err: Error) => {
                    openToast({ type: "error", message: err.message || "Failed To upload Image" })
                }
            })
    }


    return (
        <>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-primary">Write a Story</h1>
                        <p className="text-gray-800 mt-1">Share your ideas with the world</p>
                    </div>
                    {/* <Button onClick={handleSubmit} disabled={isSubmitting} className="rounded-full px-6">
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Publish
                    </Button>
                     */}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <input
                            type="text"
                            value={blogdata.title}
                            onChange={(e) => setBlogdata({ ...blogdata, title: e.target.value })}
                            placeholder="Title"
                            className="w-full text-4xl font-serif font-bold border-0 border-b-2 border-gray-300 focus:border-primary focus:outline-none bg-transparent py-3 placeholder-gray-300 transition-colors"
                            maxLength={150}
                        />
                        <div className="text-xs text-gray-800 text-right mt-1">{blogdata.title.length}/150</div>
                        {formErrors.title && <p className='text-sm text-red-700 text-start'>{formErrors.title}</p>}
                    </div>

                    <div>
                        <textarea
                            value={blogdata.description}
                            onChange={(e) => setBlogdata({ ...blogdata, description: e.target.value })}
                            placeholder="Write a brief description of your story..."
                            rows={3}
                            className="w-full text-lg font-serif italic border-0 border-b border-gray-300/50 focus:border-primary focus:outline-none bg-transparent py-3 resize-none placeholder-gray-300 transition-colors"
                            maxLength={300}
                        />
                        <div className="text-xs text-gray-800 text-right mt-1">{blogdata.description.length}/300</div>
                        {formErrors.description && <p className='text-sm text-red-700 text-start'>{formErrors.description}</p>}
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setBlogdata({ ...blogdata, category: cat })}
                                    className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition-all border ${blogdata.category === cat
                                        ? 'bg-gray-800 text-white border-gray-800 shadow'
                                        : 'bg-white border-gray-300/50  hover:border-black hover:text-black'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        {formErrors.category && <p className='text-sm text-red-700 text-start'>{formErrors.category}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Cover Image URL <span className="text-gray-800 font-normal">(optional)</span></label>
                        <div className="flex items-center space-x-3">
                            <ImageIcon className="w-5 h-5 text-gray-800 flex-shrink-0" />
                            <input
                                type="file"
                                // value={imageFile}
                                disabled={imageUploadPending}
                                accept=".png, .jpg, .jpeg, .webp"
                                ref={inputFileRef}
                                onChange={handleImageUpload}
                                placeholder="https://example.com/image.jpg"
                                className="flex-1 px-4 py-2.5 border border-gray-300/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-500/30 bg-white"
                            />
                            {imageUploadPending && <SmallComponentSpinner />}
                        </div>
                        {formErrors.image && <p className='text-sm text-red-700 text-start'>{formErrors.image}</p>}
                        {displayImage && (
                            <div className="mt-3 rounded-xl overflow-hidden max-h-48">
                                <img src={displayImage} alt="Cover preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Content
                            {/* <span className="text-gray-800 font-normal ml-2">({wordCount} words)</span> */}
                        </label>
                        <Editor
                            value={blogdata.content}
                            onChange={(e) => setBlogdata({ ...blogdata, content: e.target.value })}
                        >
                            <Toolbar>
                                <BtnUndo />
                                <BtnRedo />
                                <Separator />
                                <BtnBold />
                                <BtnItalic />
                                <BtnUnderline />
                                <BtnStrikeThrough />
                                <Separator />
                                <BtnNumberedList />
                                <BtnBulletList />
                                <Separator />
                                <BtnLink />
                                <BtnClearFormatting />
                                <HtmlButton />
                                <Separator />
                                <BtnStyles />
                            </Toolbar>
                        </Editor>
                        {formErrors.content && <p className='text-sm text-red-700 text-start'>{formErrors.content}</p>}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-300">
                        <Link href="/">
                            <button type="button" className="rounded-full">Cancel</button>
                        </Link>
                        <button type="submit" disabled={isAddblogPending} className="rounded-full px-8">
                            {isAddblogPending ? <><SmallComponentSpinner />Publishing...</> : 'Publish Story'}
                        </button>
                        {/* <button onClick={uploadImage} className="text-black p-4 border border-black">Upload File</button> */}
                    </div>
                </form>
            </div>

        </>
    )
}


export default AddBlog