import type {User} from "../api/types.ts";

export type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

export type ToastType = "success" | "error" | "info";
export type Toast = {
    id: string;
    message: string;
    type: ToastType;
};
export type ToastContextType = {
    showToast: (toast: Omit<Toast, "id">) => void;
};