import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Message } from "../libs/message"; //
import { chatService } from "../libs/services/chatService"; //

interface ChatContextType {
    messages: Message[];
    isLoading: boolean;
    onSendMessage: (text: string) => Promise<void>;
    startNewChat: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addMessage = (message: Message) => {
        setMessages((prev) => [...prev, message]);
    }

    const onSendMessage = async (text: string) => {
        addMessage({ role: "user", content: text });

        setIsLoading(true);
        const message = await chatService.chat(text);
        addMessage(message);
        setIsLoading(false);
    };

    const onLoadMessage = async () => {
        setIsLoading(true);
        const initialMessages: Message[] = await chatService.getMessages();
        setMessages(initialMessages);
        setIsLoading(false);
    };

    useEffect(() => {
        onLoadMessage();
    }, []);

    const startNewChat = () => {
        setIsLoading(false); 
        setMessages([]);     // Đặt mảng messages về rỗng
    };

    const value : ChatContextType = {
        messages,
        isLoading,
        onSendMessage,
        startNewChat
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatContext must be used within a ChatProvider");
    }
    return context;
}