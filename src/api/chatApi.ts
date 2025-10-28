import type { Message } from "../libs/message";
import { mockChatApi } from "./mockChatApi";

export const chatApi = {
    getMessages: async (): Promise<Message[]> => {
        return mockChatApi.getMessages();
    },

    chat: async (message: string): Promise<Message> => {
        return mockChatApi.chat(message);
    }
}