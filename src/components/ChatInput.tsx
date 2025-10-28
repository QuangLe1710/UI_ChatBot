import { Button, Input } from "antd";
import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";

interface ChatInputProps {
    onSendMessage: (text: string) => void;
    isLoading?: boolean;
}

const { TextArea } = Input;

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
    const [text, setText] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;
        if (text.trim()) {
            onSendMessage(text);
            setText("");
        }
    };

    // Xử lý Gửi bằng Enter (Shift + Enter để xuống dòng)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any); // Ép kiểu vì handleSubmit mong đợi FormEvent
        }
    };

    return (
        <form onSubmit={handleSubmit} className="py-4">
            <div className="relative mx-auto ">
                <TextArea
                    name="question"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask U+ Biz Chatbot"
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    className="text-base! py-3! px-4! pr-12! rounded-3xl!"
                />
                <div className="absolute top-2.5 right-4.5">
                    <Button
                        color="default"
                        variant="text"
                        shape="circle"
                        htmlType="submit"
                        icon={<SendOutlined />}
                        disabled={!text.trim() || isLoading}
                    />
                </div>
            </div>
        </form>
    );
}
