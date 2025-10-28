import { useEffect, useState } from "react";
import ChatInput from "../components/ChatInput";
import ChatWindow from "../components/ChatWindow";
import type { Message } from "../libs/message";
import { chatService } from "../libs/services/chatService";

export default function ChatPage() {
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

    return (
        <div className="flex flex-col h-full bg-[#ffffff]">
            <div className="flex-1 overflow-y-auto">
                {messages.length === 0 && !isLoading ? (
                    <div className="flex items-end h-full justify-center">
                        <div className="text-[35px] font-medium">
                            I'm U+ Biz Assistant. What can I do for you?
                        </div>
                    </div>
                ) : (
                    <div className="max-w-[840px] m-auto px-4 pt-10">
                        <ChatWindow messages={messages} isLoading={isLoading} />
                    </div>
                )}
            </div>

            <div className={`${messages.length === 0 && !isLoading ? "flex-1" : ""}`}>
                <div className="max-w-[840px] m-auto">
                    <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}
