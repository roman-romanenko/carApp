import type {ModalProps} from "./types.ts";
import Button from "../../atoms/Button";
export default function Modal({
                                  isOpen,
                                  title,
                                  text,
                                  children,
                                  buttons = [],
                                  onClose,
                              }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="modal-header">
                        <h2>{title}</h2>
                    </div>
                )}

                <div className="modal-body">
                    {text && <p>{text}</p>}
                    {children}
                </div>

                {buttons.length > 0 && (
                    <div className="modal-footer">
                        {buttons.map((btnProps) => (
                            <Button {...btnProps} />
                            // <button
                            //     key={i}
                            //     className={`modal-btn ${btn.variant || "primary"}`}
                            //     onClick={btn.onClick}
                            //     disabled={btn.disabled}
                            // >
                            //     {btn.label}
                            // </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}