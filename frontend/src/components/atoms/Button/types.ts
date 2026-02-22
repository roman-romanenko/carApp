import type {ReactNode} from "react";

export type ButtonProps = {
    onClick?: () => void;
    icon?: ReactNode;
    text?: string;
    type?: "button" | "submit"
    className?: string;
    onlyIcon?: boolean;
    disabled?: boolean;
    kind?: "primary" | "secondary" | "outline" | "danger"
};