import { message } from "antd";
import { createContext, useContext, type ReactNode } from "react";

const ToastContext = createContext<ReturnType<
    typeof message.useMessage
> | null>(null);

export default function ToastProvider({ children }: { children: ReactNode }) {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <ToastContext.Provider value={[messageApi, contextHolder]}>
            {children}
            {contextHolder}
        </ToastContext.Provider>
    );
}

export function useGlobalToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error(
            "useGlobalToast must be used within a ToastProvider"
        );
    }
    return context[0]; // chỉ trả modal instance thôi
}
