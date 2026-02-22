import {generatePath, useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../../../system/router/constants.ts";
import type {AdResponeType} from "../../../pages/Ads/types.ts";

const AdCard = ({ ad }: { ad: AdResponeType }) => {
    const title = `${ad.brand} ${ad.model} ${ad.year}`;
    const navigate = useNavigate();

    const onDetailsPage = () => {
        const link = generatePath(APP_ROUTES.ads.details, { id: ad.id })

        navigate(link)
    }

    return (
        <div className="ad-card" onClick={onDetailsPage}>
            <img src={ad.images[0]} alt={ad.title} className="ad-card__image"/>

            <div className="ad-card__thumbs">
                {ad.images.slice(1, 5).map((img: string, i: number) => (
                    <img key={i} src={img} alt="thumb" />
                ))}
            </div>

            <div className="ad-card__body" onClick={onDetailsPage}>
                <h3 className="ad-card__title">{title}</h3>
                <p className="ad-card__price">${ad.price}</p>
            </div>
        </div>
    );
};

export default AdCard;