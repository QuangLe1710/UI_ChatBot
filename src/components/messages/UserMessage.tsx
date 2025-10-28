import { Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import CopyBtn from "../CopyBtn";

interface UserMessageProps {
    content: string;
}

export default function UserMessage({ content }: UserMessageProps) {
    return (
        <div className="flex flex-col items-end group">
            <div className="py-3 px-5 bg-[#EAEAEA] rounded-2xl text-base max-w-[500px] text-wrap wrap-break-word">
                {content}
            </div>
            <div className="actions opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-0.5">
                <CopyBtn content={content} />
                <Tooltip title="Edit message" placement="bottom">
                    <Button type="text" icon={<EditOutlined className="text-gray-500!" />} />
                </Tooltip>
            </div>
        </div>
    );
}