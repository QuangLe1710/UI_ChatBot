import { Layout } from "antd";
import { useState, useEffect } from "react";
import logoLGCNS1 from "../../assets/logoLGCNS1.png";
import menu from "../../assets/menu.svg";
import Vector from "../../assets/Vector.png";
import iconAvatar from "../../assets/iconAvatar.png";
import imageIcon from "../../assets/imageIcon.png";
import { Avatar, Switch } from "antd";
import { FormOutlined, LoadingOutlined } from "@ant-design/icons";
import SiderItem from "./SiderItem";
import { useChatContext } from "../../contexts/ChatContext";
import type { Conversation } from "../../libs/conversation";
import { chatService } from "../../libs/services/chatService";
import { Columns2, LayoutSplit, LayoutPanelTop } from "lucide-react";

export default function Sider() {
    const [history, setHistory] = useState<Conversation[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [collapsed, setCollapsed] = useState(false);
    const [themeToggled, setThemeToggled] = useState(false);
    const { messages, startNewChat } = useChatContext();

    // 6. loadHistory
    useEffect(() => {
        const loadHistory = async () => {
            setIsLoading(true);
            try {
                const historyData = await chatService.getHistory();
                setHistory(historyData); // Đã lấy từ mock API
            } catch (error) {
                console.error("Lỗi khi tải lịch sử:", error);
            }
            setIsLoading(false);
        };

        loadHistory();
    }, []);

    // 7. Cập nhật onCreateChat để gọi service (async)
    const onCreateChat = async () => {
        console.log("Create new chat");

        // Chỉ lưu nếu có tin nhắn
        if (messages.length > 0) {
            const messageUserFirst = messages.find((m) => m.role === "user");

            const title = messageUserFirst
                ? messageUserFirst.content.substring(0, 30) // Lấy title
                : "Cuộc trò chuyện mới";

            // 8. Tạo object Conversation (chỉ id và title)
            const newConversation: Conversation = {
                id: crypto.randomUUID(), // Tạo ID ngẫu nhiên
                title: title,
            };

            try {
                // 9. Gọi service để lưu
                const savedConvo = await chatService.saveConversation(newConversation);
                // Cập nhật UI ngay lập tức
                setHistory([savedConvo, ...history]);
            } catch (error) {
                console.error("Lỗi khi lưu cuộc hội thoại:", error);
            }
        }

        startNewChat(); // Reset cửa sổ chat
    };



    return (
        <>
            <Layout.Sider
                width={300}
                style={{ background: "#222222" }}
                collapsible
                collapsed={collapsed}
                trigger={null}
                collapsedWidth={80}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="flex flex-col justify-between h-full">
                    {/* --- div top --- */}
                    <div className="flex flex-col p-6 pt-3 gap-y-2.5 justify-center align-middle">
                        <div className="flex justify-end">
                            {/* Icon menu*/}
                            <img
                                src={menu}
                                alt="menu"
                                onClick={() => setCollapsed(!collapsed)}
                                className="cursor-pointer mr-0.5"
                                title={`${collapsed ? "Open sidebar" : "Close sidebar"}`}
                            />
                        </div>
                        <div className={`flex items-center justify-center mx-auto mt-[-10] w-full ${collapsed ? "hidden" : ""}`}>
                            {/* Logo */}
                            <img src={logoLGCNS1} className={``} alt="LogoLG" />
                        </div>

                        {/* Icon Add when collapse */}
                        <div className={`ml-0.5 ${collapsed ? "" : "hidden"}`}>
                            <img
                                src={Vector}
                                alt="add New Chat"
                                onClick={onCreateChat}
                                className="cursor-pointer"
                            />
                        </div>

                        {/* Tiêu đề
                        <div className={`mx-auto ${collapsed ? 'hidden' : ''}`}>
                            <h2 className="text-[white] text-2xl">
                                <span className="font-bold mr-1.5">U+ BIZ</span> CHATBOT
                            </h2>
                        </div> */}

                        {/* Button New Chat */}
                        <div className={` ${collapsed ? "hidden" : ""} `}>
                            <SiderItem
                                onClick={onCreateChat}
                                className="text-white hover:bg-[#A50034] gap-2 py-1.5 font-bold text-[20px] rounded-[10px] flex items-center justify-center"

                            >
                             New Chat
                            </SiderItem>
                        </div>

                        {/* separator */}
                        <hr
                            className={`border-t border-gray-600 w-[calc(100%+50px)] ml-[-26px] my-4 ${collapsed ? "hidden" : ""
                                }`}
                        />
                    </div>

                    {/* History */}
                    <div
                        className={`history flex flex-col px-2 ${collapsed ? "hidden" : ""
                            } flex-1 overflow-y-auto min-h-0 custom-scrollbar overflow-hidden `}
                    >
                        {
                            // 10. Sử dụng state 'isLoading' mới
                            isLoading ? (
                                <div className='text-white text-[20px] p-2 flex items-center justify-center'>
                                    <LoadingOutlined spin /> Loading...
                                </div>
                            ) :
                                // 11. Sử dụng state 'history' mới
                                history.length < 1 ? (
                                    <div className="text-white text-[20px] p-2">
                                        No data available
                                    </div>
                                ) : (
                                    // 12. Lặp qua mảng 'history'
                                    history.map((convo) => (
                                        <SiderItem
                                            key={convo.id} // <-- Dùng key là convo.id
                                            className="text-white hover:bg-[#969797] rounded-lg text-[18px] p-2"
                                        >
                                            {convo.title} {/* <-- Hiển thị convo.title */}
                                        </SiderItem>
                                    ))
                                )
                        }
                    </div>

                    {/* --- Bottom (Avatar + Switch) --- */}
                    <div
                        className={`flex flex-col items-center mx-auto`}
                    >
                        <div className={`flex flex-col items-center p-6 mx-auto `}>
                            <div className="relative">
                                {/* <Badge
                                    count={
                                        <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-[#222222]" />
                                    }
                                    offset={[-5, 5]} // Setting position Badge
                                >
                                    
                                </Badge> */}
                                <Avatar src={iconAvatar} size={40} />
                            </div>
                        </div>

                        <div className={`flex flex-col items-center p-6 mx-auto ${collapsed ? "hidden" : ""}`}>
                            <Switch
                                className="scale-150"
                                checked={themeToggled}
                                onChange={setThemeToggled}
                                checkedChildren={
                                    <img
                                        src={imageIcon}
                                        alt="custom icon"
                                        style={{
                                            width: "15px",
                                            height: "15px",
                                            objectFit: "contain",
                                            marginTop: "4px",
                                        }}
                                    />
                                }
                                unCheckedChildren={
                                    <img
                                        src={imageIcon}
                                        alt="custom icon"
                                        style={{
                                            width: "15px",
                                            height: "15px",
                                            objectFit: "contain",
                                        }}
                                    />
                                }
                            />
                        </div>

                    </div>
                </div>
            </Layout.Sider>
        </>
    );
}
