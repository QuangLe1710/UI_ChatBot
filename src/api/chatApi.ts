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
     * Get All History Conversations
     */
    getHistory: async (): Promise<Conversation[]> => {
        return mockConversationApi.getHistory();
    },

    /**
     * Save a new conversation
     */
    saveConversation: async (conversation: Conversation): Promise<Conversation> => {
        return mockConversationApi.saveConversation(conversation);
    }
}