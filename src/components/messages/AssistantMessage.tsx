import { DislikeOutlined, LikeOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import Markdown from "react-markdown";
import CopyBtn from "../CopyBtn";

export default function AssistantMessage({ content }: { content: string }) {
    return (
        <div className="flex flex-col items-start">
            <div className="text-base prose max-w-none! pl-2.5">
                <Markdown children={content} />
            </div>
            <div className="actions">
                <CopyBtn content={content} />
                <Tooltip title="Good response" placement="bottom">
                    <Button type="text" icon={<LikeOutlined className="text-gray-500!" />} />
                </Tooltip>
                <Tooltip title="Bad response" placement="bottom">
                    <Button type="text" icon={<DislikeOutlined className="text-gray-500!" />} />
                </Tooltip>
                <Tooltip title="Try again" placement="bottom">
                    <Button type="text" icon={<SyncOutlined className="text-gray-500!" />} />
                </Tooltip>
            </div>
        </div>
    );
}
