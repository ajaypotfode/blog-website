import { atom } from "jotai";

interface ToastItems {
    type: "info" | "success" | "error",
    id: string;
    message: string;
    // duration?: number
}

export const toastAtom = atom<ToastItems[]>([]);


export const closeToastAtom = atom(
    undefined,
    (get, set, id: string) => {
        const toasts = get(toastAtom);
        set(
            toastAtom,
            toasts.filter((toast) => toast.id !== id)
        )
    }
);


export const openToastAtom = atom(
    undefined,
    // Omit<> is used to decide type with ignoring mentioned key(here "id" will be ignore from given Type)
    (get, set, data: Omit<ToastItems, 'id'>) => {
        const id = new Date().getTime().toString(36);
        const toasts = get(toastAtom);

        const newToast = {
            id,
            message: data.message,
            type: data.type,
            // duration: 3000
        }

        set(toastAtom, [...toasts, newToast])

        setTimeout(() => {
            set(closeToastAtom, id)
        }, 3000);

    }
)
