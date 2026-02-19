export type ButtonProps = {
    onClick?: () => void;
    icon?: React.ReactNode;
    text?: string;
    type?: "button" | "submit"
    className?: string;
    onlyIcon?: boolean;
    disabled?: boolean;
};