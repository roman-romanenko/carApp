import React, {createContext, useContext, useRef, useState} from "react";
import type {Toast, ToastContextType} from "./types.ts";

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const toastShown = useRef(false);
    const showToast = (toast: Omit<Toast, "id">) => {
        if (toastShown.current) return;
        toastShown.current = true;

        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, ...toast }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
            toastShown.current = false;
        }, 5000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(t => (
                    <div key={t.id} className={`toast ${t.type}`}>
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context;
};
