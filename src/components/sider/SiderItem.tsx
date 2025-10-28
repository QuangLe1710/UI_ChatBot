interface SiderItemProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    icon? : React.ReactNode;
}
export default function MenuItem({ children, className, onClick , icon }: SiderItemProps) {
    return <div className={` whitespace-nowrap m-2 cursor-pointer text-ellipsis ${className || ''}`} onClick={onClick}>
        {icon} {children}
    </div>
}