"use client"

import { SmallComponentSpinner } from "@/component/Loaders";
import RichTextField from "@/component/RichTextField";
import UseBlogData from "@/hooks/useBlogData";

const AddBlog = () => {

    const { handleImageUpload, getAddBlog, blogdata, handleBlogData, handleRichtextChange, imageRef, richTextRef, loading, formErrors } = UseBlogData();


    return (
        <div className="max-w-2xl lg:w-[60%] md:w-[80%] sm:[90%]">
            <h3 className="font-bold text-xl mb-4 text-start ">Create New Blog</h3>
            <div className="mb-6 ">
                <label className="block text-black mb-2 text-start">Upload thumbnail</label>
                <div className="border-2 border-dashed border-gray-300 rounded flex h-20 cursor-pointer w-80 justify-between items-center ">
                    <input type="file" className="w-full h-[100%]  p-6 flex-1 " placeholder="Upload Image" onChange={handleImageUpload} ref={imageRef} />
                    {loading['uploadImage'] && <SmallComponentSpinner />}
                </div>
            </div>


            <div className="mb-4">
                <label className="block text-black mb-1 text-start">Blog title</label>
                <input
                    type="text"
                    name='title'
                    value={blogdata.title}
                    onChange={handleBlogData}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Type here"
                />
                {formErrors.title && <p className='text-sm text-red-700 text-start'>{formErrors.title}</p>}
            </div>


            <div className="mb-4">
                <label className="block text-black mb-1 text-start">Blog Category</label>
                <select name="category" value={blogdata.category} id="" className="w-full border border-gray-300 rounded px-3 py-2" onChange={handleBlogData}>
                    <option value="">select category</option>
                    <option value="music">music</option>
                    <option value="games">games</option>
                    <option value="sports">sports</option>
                </select>
                {formErrors.category && <p className='text-sm text-red-700 text-start'>{formErrors.category}</p>}
            </div>


            <div>
                <label className="block text-black mb-1 text-start">Blog Description</label>
                <div className="w-full rounded border border-gray-300  ">
                    <RichTextField handleChange={handleRichtextChange} richTextEditor={richTextRef} />
                </div>
                {formErrors.description && <p className='text-sm text-red-700 text-start'>{formErrors.description}</p>}
            </div>

            
            <div className="mt-3">
                <button
                    type="submit"
                    className="w-fit px-6 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                    onClick={getAddBlog}
                >
                  {
                    loading['addBlog']?<SmallComponentSpinner/>:
                    "Add Blog"
                  }
                </button>
            </div>
        </div>
    );
}


export default AddBlog