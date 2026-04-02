'use client'
import { closeToastAtom, toastAtom } from "@/atom/toastAtom";
import { useAtom } from "jotai";
import { AlertCircle, CheckCircle, X, XCircle } from "lucide-react";

export default function ToastContainer() {
    const [toasts] = useAtom(toastAtom);
    const [, closeToast] = useAtom(closeToastAtom);

    // const toast = {
    //     message: "jnjdjd ndjknjnd kjdkjnd knjkdn",
    //     type: 'error',
    //     id: 'djjjjd'
    // }

    return (
        <div className="fixed top-4 right-4 flex flex-col gap-3 z-51">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="bg-white px-4 py-3 rounded-xl shadow-md border flex items-center justify-between gap-4 min-w-[250px]"
                >
                    <div className="flex items-center gap-3 font-bold">
                        <span
                            className={` flex items-center justify-center w-8 h-8 rounded-full
                                         ${toast.type === "success" && "bg-green-100 text-green-600"}
                                         ${toast.type === "info" && "bg-blue-100 text-blue-600"}
                                         ${toast.type === "error" && "bg-red-100 text-red-600"}`}
                        >
                            {toast.type === "success" && <CheckCircle className="w-4 h-4" />}
                            {toast.type === "info" && <AlertCircle className="w-4 h-4" />}
                            {toast.type === "error" && <XCircle className="w-4 h-4" />}
                        </span>

                        <span className="text-sm text-gray-800">
                            {toast.message}
                        </span>
                    </div>

                    <button
                        onClick={() => closeToast(toast.id)}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}