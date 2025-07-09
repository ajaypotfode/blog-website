"use client"

// import { EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import TextStyle from '@tiptap/extension-text-style';
// import { Editor, Extension } from '@tiptap/core';
import React, { useEffect } from 'react';
import { RichText } from '@/types/RichTextType';
import UseRichTextData from '@/hooks/useRichTextData';
import dynamic from 'next/dynamic';
import type { EditorContentProps } from '@tiptap/react';

const EditorContent = dynamic<EditorContentProps>(() => import('@tiptap/react').then(module => module.EditorContent), {
    ssr: false
})


const RichTextField: React.FC<RichText> = ({ handleChange, richTextEditor }) => {
    const { fontSize, editor, applyFontSize } = UseRichTextData(handleChange)

    useEffect(() => {
        richTextEditor.current = editor
    }, [editor])


    return (
        <div className="mt-4">
            <div className=" rounded-md p-4 bg-white shadow-sm space-y-3 h-[300px]">
                <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
                    <button
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        className="px-3 py-1 font-bold text-black rounded  text-sm"
                    >
                        B
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        className="px-3 py-1 italic font-bold text-black rounded text-sm focus:bg-gray-500"
                    >
                        I
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleUnderline().run()}
                        className="px-3 py-1  text-black rounded font-bold underline focus:bg-gray-500 "
                    >
                        U
                    </button>
                    <select
                        value={fontSize}
                        onChange={(e) => applyFontSize(e.target.value)}
                        className="border px-2 py-1 rounded text-sm"
                    >
                        {['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '32px', '48px', '56px', '64px'].map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 h-[90%]" onClick={() => {
                    if (editor && editor.view && !editor.isFocused) {
                        editor.chain().focus().setTextSelection(0).run();
                    }
                }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            editor?.chain().focus().setHardBreak().run();
                        }
                    }
                    }
                >

                    <EditorContent editor={editor} className="h-full text-start focus:outline-none focus:ring-0 overflow-y-auto scrollbar-hidden " />
                </div>
            </div>
        </div>
    );
};

export default RichTextField;
