// import { Button, Input } from "antd";
// import { useState } from "react";
// import { SendOutlined } from "@ant-design/icons";

// interface ChatInputProps {
//     onSendMessage: (text: string) => void;
//     isLoading?: boolean;
// }

// const { TextArea } = Input;

// export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
//     const [text, setText] = useState<string>("");

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (isLoading) return;
//         if (text.trim()) {
//             onSendMessage(text);
//             setText("");
//         }
//     };

//     // Xử lý Gửi bằng Enter (Shift + Enter để xuống dòng)
//     const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault();
//             handleSubmit(e as any); // Ép kiểu vì handleSubmit mong đợi FormEvent
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="py-4">
//             <div className="relative mx-auto ">
//                 <TextArea
//                     name="question"
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                     placeholder="Ask U+ Biz Chatbot"
//                     autoSize={{ minRows: 2, maxRows: 4 }}
//                     className="text-base! py-3! px-4! pr-12! rounded-3xl! chatpage-scrollbar"
//                 />
//                 <div className="absolute top-2.5 right-4.5">
//                     <Button
//                         color="default"
//                         variant="text"
//                         shape="circle"
//                         htmlType="submit"
//                         icon={<SendOutlined />}
//                         disabled={!text.trim() || isLoading}
//                     />
//                 </div>
//             </div>
//         </form>
//     );
// }

import { Button, Input, Modal, Tooltip } from "antd"; // 1. Import Modal
import { useState } from "react";
import { SendOutlined, ExpandOutlined, CompressOutlined } from "@ant-design/icons"; // 2. Import icon

interface ChatInputProps {
    onSendMessage: (text: string) => void;
    isLoading?: boolean;
}

const { TextArea } = Input;

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
    const [text, setText] = useState<string>("");

    // 3. Thêm state để quản lý việc phóng to/thu nhỏ
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;
        if (text.trim()) {
            onSendMessage(text);
            setText("");
            setIsExpanded(false); // 4. Tự động đóng Modal khi Gửi
        }
    };

    // Xử lý Gửi bằng Enter (Shift + Enter để xuống dòng)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    // 5. Hàm để mở và đóng Modal
    const showModal = () => setIsExpanded(true);
    const hideModal = () => setIsExpanded(false);

    return (
        <>
            <form onSubmit={handleSubmit} className="py-4">
                <div className="relative mx-auto rounded-3xl! overflow-hidden border border-solid border-gray-300">
                    <TextArea
                        name="question"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask U+ Biz Chatbot"
                        autoSize={{ minRows: 2, maxRows: 4 }}
                        className="text-base! py-3! px-4! pl-12! pr-12! chatpage-scrollbar border-0! shadow-none! focus:shadow-none!"
                    />

                    <div className="absolute top-2.5 left-4.5">
                        <Tooltip title="Expand">
                            <Button
                                shape="circle"
                                type="text"
                                icon={<ExpandOutlined />}
                                onClick={showModal}
                            />
                        </Tooltip>
                        
                    </div>
                    <div className="absolute top-2.5 right-4.5">
                        <Tooltip title={`${!text.trim() || isLoading ? "" : "Send a question"}`}>
                            <Button
                                color="default"
                                variant="text"
                                shape="circle"
                                htmlType="submit"
                                icon={<SendOutlined />}
                                disabled={!text.trim() || isLoading}
                            />
                        </Tooltip>
                    </div>
                </div>
            </form>

            <Modal
                open={isExpanded}
                onCancel={hideModal}
                footer={null} 
                title="Nhập nội dung"
                closeIcon={<CompressOutlined title="Thu nhỏ" />} 
                width="80vw" 
            >
                <form onSubmit={handleSubmit} className="py-4">
                    <div className="relative rounded-3xl! overflow-hidden">
                        <TextArea
                            name="question"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask U+ Biz Chatbot"
                            autoSize={{ minRows: 10, maxRows: 20 }}
                            className="text-base! py-3! px-4! pr-12! chatpage-scrollbar border-0! shadow-none! focus:shadow-none!"
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
            </Modal>
        </>
    );
}


// return (
    //     <>
    //         {/* --- INPUT GỐC (BÌNH THƯỜNG) --- */}
    //         <form onSubmit={handleSubmit} className="py-4">
    //             <div className="relative mx-auto ">
    //                 <TextArea
    //                     name="question"
    //                     value={text}
    //                     onChange={(e) => setText(e.target.value)}
    //                     onKeyDown={handleKeyDown}
    //                     placeholder="Ask U+ Biz Chatbot"
    //                     autoSize={{ minRows: 2, maxRows: 4 }}
    //                     // 6. Thêm padding bên trái cho nút mới
    //                     className="text-base! py-3! px-4! pl-12! pr-12! rounded-3xl! chatpage-scrollbar " 
    //                 />

    //                 {/* 7. Nút Phóng to (MỚI) */}
    //                 <div className="absolute top-2.5 left-4.5">
    //                     <Button
    //                         shape="circle"
    //                         icon={<ExpandOutlined />}
    //                         onClick={showModal}
    //                         title="Phóng to"
    //                     />
    //                 </div>

    //                 {/* Nút Gửi */}
    //                 <div className="absolute top-2.5 right-4.5">
    //                     <Button
    //                         color="default"
    //                         variant="text"
    //                         shape="circle"
    //                         htmlType="submit"
    //                         icon={<SendOutlined />}
    //                         disabled={!text.trim() || isLoading}
    //                     />
    //                 </div>
    //             </div>
    //         </form>

    //         {/* --- MODAL PHÓNG TO (MỚI) --- */}
    //         <Modal
    //             open={isExpanded}
    //             onCancel={hideModal}
    //             footer={null} // Ẩn nút OK/Cancel
    //             title="Nhập nội dung"
    //             closeIcon={<CompressOutlined title="Thu nhỏ" />} // Thay icon 'X'
    //             width="80vw" // Chiếm 80% chiều rộng màn hình
    //         >
    //             {/* Sử dụng lại logic form y hệt bên trong Modal.
    //               Chúng dùng chung state 'text' và hàm 'handleSubmit'.
    //             */}
    //             <form onSubmit={handleSubmit} className="py-4">
    //                 <div className="relative">
    //                     <TextArea
    //                         name="questionExpanded"
    //                         value={text} // Dùng chung state
    //                         onChange={(e) => setText(e.target.value)} // Dùng chung state
    //                         onKeyDown={handleKeyDown} // Dùng chung logic Enter
    //                         placeholder="Ask U+ Biz Chatbot"
    //                         autoSize={{ minRows: 10, maxRows: 20 }} // Kích thước lớn
    //                         className="w-full text-base! pr-3! py-3! px-4! pr-12! rounded-3xl! chatpage-scrollbar"
    //                     />
    //                     <div className="absolute top-2.5 right-4.5">
    //                         <Button
    //                             color="default"
    //                             variant="text"
    //                             shape="circle"
    //                             htmlType="submit"
    //                             icon={<SendOutlined />}
    //                             disabled={!text.trim() || isLoading}
    //                         />
    //                     </div>
    //                 </div>
    //             </form>
    //         </Modal>
    //     </>
    // );