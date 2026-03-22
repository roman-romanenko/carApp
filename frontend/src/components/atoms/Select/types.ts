export interface Option {
    label: string;
    value: string;
    [key: string]: any;
}

export interface SelectProps {
    options: Option[];
    label?: string;
    value?: string;
    onChange: (selected: Option) => void;
    placeholder?: string;
    searchable?: boolean;
}