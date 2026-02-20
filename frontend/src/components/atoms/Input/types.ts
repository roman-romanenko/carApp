export type InputProps = {
    name: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    type?: "text" | "email" | "password" | "number";
    value: string | number;
    onChange: (value: string) => void;
};
