import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// import { useEffect, useState } from "react";
import { Extension } from '@tiptap/core';
import { useState } from "react";
import HardBreak from "@tiptap/extension-hard-break";
// import { useAppDispatch } from "@/redux/reduxHooks";
// import { getInstanceOfRichTextEditor } from "@/redux/slice/blogSlice";


const UseRichTextData = (handleChange: (value: string) => void) => {
    const [fontSize, setFontSize] = useState('12px');
    // const dispatch = useAppDispatch()

    // Font size extension
    const FontSize = Extension.create({
        name: 'fontSize',

        addOptions() {
            return { types: ['textStyle'] };
        },

        addGlobalAttributes() {
            return [
                {
                    types: this.options.types,
                    attributes: {
                        fontSize: {
                            default: null,
                            renderHTML: attrs => {
                                if (!attrs.fontSize) return {};
                                return { style: `font-size: ${attrs.fontSize}` };
                            },
                            parseHTML: element => ({
                                fontSize: element.style.fontSize,
                            }),
                        },
                    },
                },
            ];
        },
    });


    const editor = useEditor({
        extensions: [
            // StarterKit,
            Underline,
            TextStyle,
            FontSize,
            StarterKit.configure({ hardBreak: false }),
            HardBreak.configure({ keepMarks: true }),
        ],
        content: '',
        onUpdate: (({ editor }) => {
            const html = editor.getHTML()
            handleChange(html)
        })
    });

    const applyFontSize = (size: string) => {
        editor?.chain().focus().setMark('textStyle', { fontSize: size }).run();
        setFontSize(size);
    };

    // useEffect(() => {
    //     dispatch(getInstanceOfRichTextEditor(editor?.commands.setContent))
    //     //  instanceOfRichtext?.commands.setContent("")
    //     console.log("running the Text editor useEffect", editor?.commands.setContent("ahsjkdjdhhd"));

    // }, [editor])

    return {
        fontSize,
        setFontSize,
        editor,
        applyFontSize
    }
}

export default UseRichTextData