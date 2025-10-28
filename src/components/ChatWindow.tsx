import { useEffect, useRef } from "react";
import type { Message } from "../libs/message";
import { Skeleton } from "antd";
import UserMessage from "./messages/UserMessage";
import AssistantMessage from "./messages/AssistantMessage";

interface ChatWindowProps {
    messages: Message[];
    isLoading: boolean;
}

export default function ChatWindow({ messages, isLoading }: ChatWindowProps) {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Auto scroll to the bottom when messages change
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col">
            {messages.map((msg, index) => (
                msg.role === "user" ? <UserMessage key={index} content={msg.content} /> :
                <AssistantMessage key={index} content={msg.content} />
            ))}
            {isLoading && <Skeleton active title={false} paragraph={{ rows: 3 }} />}
            <div ref={endOfMessagesRef} />
        </div>
    );
}
