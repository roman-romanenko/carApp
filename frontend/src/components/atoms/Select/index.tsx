import { useState } from "react";
import type {Option, SelectProps} from "./types.ts";

const Select = ({
                                         options,
                                         label,
                                         value,
                                         onChange,
                                         placeholder = "Select...",
                                         searchable = true,
                                     }: SelectProps)=> {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredOptions = options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (option: Option) => {
        onChange(option);
        setIsOpen(false);
        setSearch("");
    };

    return (
        <div className="select" style={{ position: "relative", width: 200 }}>
            <label>{label}</label>
            <div
                className="select-input"
                style={{
                    padding: "8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: 6,
                    cursor: "pointer",
                }}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {value ? value : placeholder}
            </div>

            {isOpen && (
                <div
                    className="options-dropdown"
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        maxHeight: 200,
                        overflowY: "auto",
                        zIndex: 1000,
                    }}
                >
                    {searchable && (
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            style={{
                                width: "100%",
                                padding: 6,
                                marginBottom: 4,
                                boxSizing: "border-box",
                            }}
                        />
                    )}

                    {filteredOptions.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => handleSelect(opt)}
                            style={{
                                padding: "8px 12px",
                                cursor: "pointer",
                                backgroundColor: value === opt.value ? "#f0f0f0" : "#fff",
                            }}
                        >
                            {opt.label}
                        </div>
                    ))}

                    {filteredOptions.length === 0 && (
                        <div style={{ padding: 8, color: "#888" }}>No results</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Select;
