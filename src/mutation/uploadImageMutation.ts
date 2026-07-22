import { uploadImage } from "@/service/imageUploadService"
import { useMutation } from "@tanstack/react-query"

export const useUploadImageMutation = () => {
    return useMutation({
        mutationFn:  (file: File) => {
            return uploadImage(file)
        }
    })
}