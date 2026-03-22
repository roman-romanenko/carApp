import type {CardProps} from "./types.ts";
import classNames from "classnames";

export default function Card({ children, title, maxContentSize }: CardProps) {
    return (
        <div className="card">
            <div className={classNames("card__content", maxContentSize && `card__content--${maxContentSize}`)}>
                {title && (
                    <div className="card__header">
                        <h1 className="card__title">{title}</h1>
                    </div>
                )}

                {children}
            </div>
        </div>
    );
}

