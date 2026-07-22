import { atom } from "jotai";

interface ConfirmModal {
    message: string;
    title: string;
    resolve: (value: boolean) => void
}

export const confirmModalAtom = atom<ConfirmModal[]>([]);

export const openConfirmModalAtom = atom(
    undefined,
    (get, set, data: Omit<ConfirmModal, 'resolve'>) => {
        const modals = get(confirmModalAtom);

        return new Promise<boolean>((resolve) => {
            set(confirmModalAtom,
                [
                    ...modals,
                    {
                        message: data.message,
                        title: data.title,
                        resolve
                    }
                ]
            )
        })
    }
);

export const closeConfirmModal = atom(
    undefined,
    (get, set, result: boolean) => {
        const modals = get(confirmModalAtom);
        if (modals.length <= 0) return;
        const lastModal = modals[modals.length - 1];
        lastModal.resolve(result);
        set(confirmModalAtom, modals.slice(0, -1))

    }
)