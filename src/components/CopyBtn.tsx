import { CopyOutlined } from "@ant-design/icons";
import { Button, message, Tooltip } from "antd";
import { useGlobalToast } from "../contexts/ToastContext";

interface CopyBtnProps {
    content: string;
}

export default function CopyBtn({ content }: CopyBtnProps) {
    const toast = useGlobalToast();
    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);
        toast.success("Copied to clipboard");
    };

    return (
        <Tooltip title="Copy message" placement="bottom">
            <Button
                type="text"
                icon={<CopyOutlined className="text-gray-500!" />}
                onClick={handleCopy}
            />
        </Tooltip>
    );
}
