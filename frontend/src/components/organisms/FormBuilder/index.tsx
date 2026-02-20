import { useState } from "react";
import Button from "../../atoms/Button";
import type { FormBuilderProps } from "./types";
import FieldItem from "./components/FieldItem.tsx";

const FormBuilder = ({
    config,
    initialValues = {},
    onSubmit,
    submitText = "Submit",
    className = "form-builder"
}: FormBuilderProps) => {
    const [form, setForm] = useState<Record<string, any>>(initialValues);

    const handleChange = (name: string, value: any) => {
        console.log(name, value)
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form className={className} onSubmit={handleSubmit}>
            {config.map((field) => (
                <FieldItem
                    key={field.name}
                    field={field}
                    value={form[field.name]}
                    onChange={(value) => handleChange(field.name, value)}
                />
            ))}

            <Button
                type="submit"
                text={submitText}
                className="btn-submit"
            />
        </form>
    );
};

export default FormBuilder;
