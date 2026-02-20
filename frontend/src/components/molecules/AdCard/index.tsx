import type {Ad} from "../../../pages/Ads/types.ts";

const AdCard = ({ ad }: { ad: Ad }) => {
    const title = `${ad.brand} ${ad.model} ${ad.year}`;

    return (
        <div className="ad-card">
            <img src={ad.images[0]} alt={ad.title} className="ad-card__image"/>

            <div className="ad-card__thumbs">
                {ad.images.slice(1, 5).map((img: string, i: number) => (
                    <img key={i} src={img} alt="thumb" />
                ))}
            </div>

            <div className="ad-card__body">
                <h3 className="ad-card__title">{title}</h3>
                <p className="ad-card__price">${ad.price}</p>
            </div>
        </div>
    );
};

export default AdCard;