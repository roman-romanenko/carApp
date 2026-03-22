import type {ReactNode} from "react";
import type {ButtonProps} from "../../atoms/Button/types.ts";

export interface ModalProps {
    isOpen: boolean;
    title?: string;
    children?: ReactNode;
    text?: string;
    buttons?: ButtonProps[];
    onClose?: () => void;
}