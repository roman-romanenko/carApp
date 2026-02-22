import Button from "../../atoms/Button";

const SellerInfoCard = ({ ad }: any) => {
    return (
        <div className="seller-card">
            <div className={"seller-card__auto-block"}>
                <span className={"seller-card__auto-title"}>{ ad?.brand } {ad?.model}</span>
                <span className={"seller-card__auto-subtitle"}>{ad?.year}</span>
            </div>
            <div className="seller-card__price">
                € {ad?.price?.toLocaleString()}
            </div>

            <div className="seller-card__location">
                📍 {ad?.location || "Location"}
            </div>

            <Button
                kind="primary"
                text={"Contact Seller"}
                className={"btn--full-width"}
            />
        </div>
    );
};

export default SellerInfoCard;