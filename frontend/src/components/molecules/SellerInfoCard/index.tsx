import Button from "../../atoms/Button";
import type {AdResponeType, UserAdInfo} from "../../../pages/Ads/types.ts";
import {BiPhone} from "react-icons/bi";
import {getUserDisplayName} from "../../../system/helpers/functions.ts";

const SellerInfoCard = ({ ad, sellerInfo }: {
    ad: AdResponeType,
    sellerInfo: UserAdInfo | null
}) => {
    const handleCall = () => {
        if (sellerInfo?.phone) {
            window.location.href = `tel:${sellerInfo.phone}`;
        }
    };

    return (
        <div className="seller-card">
            <div className={"seller-card__top"}>
                <div className="seller-card__auto-block">
                <span className="seller-card__auto-title">
                    {ad?.brand} {ad?.model}
                </span>
                    <span className="seller-card__auto-subtitle">
                    {ad?.year}
                </span>
                </div>

                <div className="seller-card__price">
                    € {ad?.price?.toLocaleString()}
                </div>

                <div className="seller-card__location">
                    📍 {ad?.location || "Location"}
                </div>
            </div>

            <div className={"seller-card__bottom"}>
                <div className="seller-card__seller">
                    <img
                        src={sellerInfo?.avatarUrl || "/avatar-placeholder.png"}
                        alt="seller"
                        className="seller-card__avatar"
                    />

                    <div className="seller-card__seller-meta">
                        <div className="seller-card__seller-name">
                            {getUserDisplayName(sellerInfo)}
                        </div>

                        {sellerInfo?.phone && (
                            <div className="seller-card__phone">
                                <BiPhone/>
                                {sellerInfo.phone}
                            </div>
                        )}
                    </div>
                </div>

                {sellerInfo?.phone && (
                    <Button
                        kind="primary"
                        text="Contact Seller"
                        className="btn--full-width"
                        onClick={handleCall}
                    />
                )}

            </div>

        </div>
    );
};

export default SellerInfoCard;