interface SiderItemProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
}
export default function SiderItem({ children, className, onClick }: SiderItemProps) {
    return <div
        className={`flex items-center m-2 cursor-pointer ${className || ''}`}
        onClick={onClick}
    >
        <div className="overflow-hidden whitespace-nowrap text-ellipsis">
            {children}
        </div>
    </div>
}