import type { Conversation } from "../libs/conversation";
import type { Message } from "../libs/message";
import { mockChatApi } from "./mockChatApi";
import { mockConversationApi } from "./mockConversationApi";

export const chatApi = {
    getMessages: async (): Promise<Message[]> => {
        return mockChatApi.getMessages();
    },

    chat: async (message: string): Promise<Message> => {
        return mockChatApi.chat(message);
    },

    /**
     * Lấy về toàn bộ lịch sử
     */
    getHistory: async (): Promise<Conversation[]> => {
        // Gọi mock API mới
        return mockConversationApi.getHistory();
    },

    /**
     * Lưu một cuộc hội thoại mới
     */
    saveConversation: async (conversation: Conversation): Promise<Conversation> => {
        // Gọi mock API mới
        return mockConversationApi.saveConversation(conversation);
    }
}