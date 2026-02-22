import React from "react";
import type {ButtonProps} from "./types.ts";
import classNames from "classnames";

const Button: React.FC<ButtonProps> = ({
   onClick,
   icon,
   text,
   className = "",
   onlyIcon = false,
   disabled = false,
   type = "button",
   kind
}) => {
    return (
        <button
            className={classNames(
                "btn",
                onlyIcon && "btn--icon",
                kind && `btn-${kind}`,
                className && className
            )}
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
