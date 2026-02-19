import type {CardProps} from "./types.ts";

export default function Card({ children, title }: CardProps) {
    return (
        <div className="card">
            <div className="card__content">
                <div className="card__header">
                    <h1 className="card__title">{title}</h1>
                </div>

                {children}
            </div>
        </div>
    );
}

