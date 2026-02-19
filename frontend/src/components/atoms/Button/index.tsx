import React from "react";
import type {ButtonProps} from "./types.ts";

const Button: React.FC<ButtonProps> = ({
   onClick,
   icon,
   text,
   className = "",
   onlyIcon = false,
   disabled = false,
   type = "button"
}) => {
    return (
        <button
            className={`btn ${className} ${onlyIcon ? "btn--icon" : ""}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {icon && <span className="btn__icon">{icon}</span>}
            {!onlyIcon && text && <span className="btn__text">{text}</span>}
        </button>
    );
};

export default Button;
