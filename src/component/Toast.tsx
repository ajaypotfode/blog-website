'use client'
import { closeToastAtom, toastAtom } from "@/atom/toastAtom";
import { useAtom } from "jotai";
import { AlertCircle, CheckCircle, X, XCircle } from "lucide-react";

export default function ToastContainer() {
    const [toasts] = useAtom(toastAtom);
    const [, closeToast] = useAtom(closeToastAtom);

//     const toasts = [{
//         message: "jnjdjd ndjknjnd kjdkjnd knjkdn",
//         type: 'error',
//         id: 'djjjjd0'
//     },
// {
//         message: "jnjdjd ndjknjnd kjdkjnd knjkdn",
//         type: 'info',
//         id: 'djjjjd1'
//     },
// {
//         message: "jnjdjd ndjknjnd kjdkjnd knjkdn",
//         type: 'success',
//         id: 'djjjjd2'
//     }]

    return (
        <div className="fixed top-4 right-4 flex flex-col gap-3 z-51">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`bg-surface px-4 py-3 rounded-xl shadow-md ring-2 flex items-center justify-between gap-4 min-w-[250px]
                         ${toast.type === "success" && "ring-green-200"}
                                         ${toast.type === "info" && "ring-blue-200"}
                                         ${toast.type === "error" && "ring-red-200"}`}
                >
                    <div className="flex items-center gap-3 font-bold">
                        <span
                            className={` flex items-center justify-center w-8 h-8 rounded-full
                    ${toast.type === "success" && "bg-green-200 text-green-600"}
                    ${toast.type === "info" && "bg-blue-200 text-blue-600"}
                    ${toast.type === "error" && "bg-red-200 text-red-600"}`}
                        >
                            {toast.type === "success" && <CheckCircle className="w-4 h-4" />}
                            {toast.type === "info" && <AlertCircle className="w-4 h-4" />}
                            {toast.type === "error" && <XCircle className="w-4 h-4" />}
                        </span>

                        <span className="text-sm text-disabled">
                            {toast.message}
                        </span>
                    </div>

                    <button
                        onClick={() => closeToast(toast.id)}
                        className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}