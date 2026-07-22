import { openToastAtom } from "@/atom/toastAtom";
import { useLogoutUserMutation } from "@/mutation/authMutation";
import { useSetAtom } from "jotai";

const useAuthData = () => {
    const { mutate, isPending } = useLogoutUserMutation();
    const openToast = useSetAtom(openToastAtom)
    const logout = () => {
        if (isPending) return;
        mutate(
            undefined,
            {
                onSuccess: () => {
                    window.location.href = '/login';
                    openToast({ type: "success", message: "Logout Successfully!!" })
                },
                onError: (err: Error) => {
                    openToast({ type: "error", message: err.message || "Failed To Create Blog" })
                }
            },
        );
    }

    return {
        logout, isPending
    }

}

export default useAuthData