import { chatApi } from "../../api/chatApi";
import type { Message } from "../message";

export const chatService = {
    getMessages: async (): Promise<Message[]> => {
        return chatApi.getMessages();
    },

    chat: async (text: string): Promise<Message> => {
        if (!text || text.trim() === "") {
            throw new Error("Message text cannot be empty");
        }

        return chatApi.chat(text);
    }
};