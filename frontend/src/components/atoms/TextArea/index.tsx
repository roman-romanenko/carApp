import React from "react";
import type { TextareaProps } from "./types";

const Textarea: React.FC<TextareaProps> = ({
    name,
    value,
    onChange,
    label,
    placeholder,
    disabled = false,
}) => {
    return (
        <div className="input-wrapper">
            {label && (
                <label htmlFor={name} className="input-label">
                    {label}
                </label>
            )}

            <textarea
                id={name}
                name={name}
                className="custom-input textarea"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    );
};

export default Textarea;
