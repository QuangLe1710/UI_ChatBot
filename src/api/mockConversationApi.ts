import type { Conversation } from "../libs/conversation"; // <-- Import interface mới của bạn

// A helper function to create a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


// --- Mock Data ---

// Dữ liệu giả mới chỉ chứa id và title
const initialMockConversations: Conversation[] = [
    {
        id: "convo-1",
        title: "Giới thiệu về Markdown"
    },
    {
        id: "convo-2",
        title: "Code Python"
    },
    {
        id: "convo-3",
        title: "Task 1"
    },
    {
        id: "convo-4",
        title: "Task 2"
    },
    {
        id: "convo-5",
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, dolor sunt at officiis culpa iusto error repudiandae? Enim voluptates, commodi recusandae dolorum incidunt sed, natus ad necessitatibus iste quae officiis"
    },
    {
        id: "convo-6",
        title: "Task 4"
    },
    {
        id: "convo-7",
        title: "Task 5"
    },
    {
        id: "convo-8",
        title: "Task 6"
    },
    {
        id: "convo-9",
        title: "Task 7"
    },
    {
        id: "convo-10",
        title: "Task 8"
    },
];

// Biến cục bộ giả lập "database"
const inMemoryConversations = [...initialMockConversations];


// --- Mock API ---

export const mockConversationApi = {
    /**
     * Giả lập việc lấy tất cả lịch sử hội thoại (cho Sider)
     */
    getHistory: async (): Promise<Conversation[]> => {
        // Giả lập độ trễ mạng (500ms)
        await delay(500);

        // Trả về danh sách hội thoại hiện tại
        return Promise.resolve([...inMemoryConversations]);
    },

    /**
     * Giả lập việc lưu một cuộc hội thoại mới
     */
    saveConversation: async (conversation: Conversation): Promise<Conversation> => {
        // Giả lập thời gian "lưu" (300ms)
        await delay(300);

        // Thêm cuộc hội thoại mới vào *đầu* mảng
        inMemoryConversations.unshift(conversation);

        // Trả về chính cuộc hội thoại đó
        return Promise.resolve(conversation);
    },
};