import { useRef } from "react";
import type {ImageUploaderProps} from "./types.ts";

export default function ImageUploader({ value = [], onChange }: ImageUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const newFiles = Array.from(files);
        const updated = [...value, ...newFiles];

        onChange?.(updated);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const removeImage = (index: number) => {
        const updated = value.filter((_, i) => i !== index);
        onChange?.(updated);
    };

    const moveLeft = (index: number) => {
        if (index === 0) return;
        const updated = [...value];
        [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
        onChange?.(updated);
    };

    const moveRight = (index: number) => {
        if (index === value.length - 1) return;
        const updated = [...value];
        [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
        onChange?.(updated);
    };

    return (
        <div className="image-uploader">
            <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={(e) => handleFiles(e.target.files)}
            />

            <button
                type="button"
                className="upload-box"
                onClick={() => inputRef.current?.click()}
            >
                📸 Upload photos
                <span>First photo will be main image</span>
            </button>

            {value.length > 0 && (
                <div className="preview-grid">
                    {value.map((file, index) => (
                        <div key={index} className="preview-card">
                            {index === 0 && (
                                <div className="main-badge">MAIN</div>
                            )}

                            <img
                                src={URL.createObjectURL(file)}
                                alt="preview"
                            />

                            <div className="preview-controls">
                                {/*<Button*/}
                                {/*    onClick={() => moveLeft(index)}*/}
                                {/*    disabled={index === 0}*/}
                                {/*    onlyIcon*/}
                                {/*    icon={<FaArrowLeft />}*/}
                                {/*/>*/}
                                <button
                                    type="button"
                                    onClick={() => moveLeft(index)}
                                    disabled={index === 0}
                                >
                                    ←
                                </button>

                                <button
                                    type="button"
                                    onClick={() => moveRight(index)}
                                    disabled={index === value.length - 1}
                                >
                                    →
                                </button>

                                <button
                                    type="button"
                                    className="remove"
                                    onClick={() => removeImage(index)}
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="order-label">
                                #{index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
