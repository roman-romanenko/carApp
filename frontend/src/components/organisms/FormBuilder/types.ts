import type {ComponentType} from "react";

export type FieldConfig = {
    name: string;
    label: string;
    component: ComponentType<any>;
    componentProps?: Record<string, any>;
};

export type FormBuilderProps = {
    config: FieldConfig[];
    initialValues?: Record<string, any>;
    onSubmit: (values: Record<string, any>) => void;
    submitText?: string;
    className?: string;
};

export type FieldItemProps = {
    field: FieldConfig;
    value: any;
    onChange: (value: any) => void;
};