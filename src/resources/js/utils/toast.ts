import { toast, ToastOptions } from "react-hot-toast"

export async function showToast(message: string, status: "success" | "error" | "loading", id?: string): Promise<void> {
    const toastOptions: ToastOptions = {
        duration: 1500,
        position: "top-right",
        icon: status === "loading" ? "↺" : status === "success" ? "◎" : "❌",
        style: {
            background: "#333",
            color: "#fff",
        },
    }

    const options = { ...toastOptions, id }
    switch (status) {
        case "success":
            toast.success(message, options)
            break
        case "error":
            toast.error(message, options)
            break
        case "loading":
            toast.loading(message, options)
            break
    }
}
