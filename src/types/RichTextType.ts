import { Editor } from "@tiptap/react"

export type EditorRef = React.RefObject<Editor | null>

export interface RichText {
    handleChange: (value: string) => void,
    richTextEditor: EditorRef
}

// export interface RichText {
//     handleChange: (value: string) => void;
// }


// export interface RichTextConfig {
//     readonly: boolean,
//     height: number,
//     placeholder: string,
//     events: unknown,
//     askBeforePasteHTML: boolean,
//     askBeforePasteFromWord: boolean,
//     enablePasteFromWord: boolean,
//     defaultActionOnPaste: string,
// }


