import Button from "../../atoms/Button";
import type {AdCardPropsType} from "./types.ts";
import axios from "axios";
import {useAuth} from "../../../system/context/AuthContext.tsx";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {getImageSrc} from "../../../system/helpers/functions.ts";

const AdCard = ({
    ad,
    actionsConfig,
    showFavorite = false
}: AdCardPropsType) => {
    const title = `${ad?.brand || ""} ${ad?.model || ""} ${ad?.year || ""}`;
    const { user, setUser } = useAuth()

    const onToggleFavorite = (id: string) => {
        axios.post(`/api/user/favorites/${id}`)
            .then(res => {
                if(user && res.data) {
                    setUser({...user, favoriteAdIds: res.data})
                }
            })
    };

    return (
        <div className="ad-card">
            {ad?.images && (
                <div className="ad-card__media">
                    <img
                        src={getImageSrc(ad?.images?.[0])}
                        alt={title}
                        className="ad-card__main-image"
                    />

                    <div className="ad-card__thumbs">
                        {ad?.images.map((img, i) => (
                            <img key={i} src={getImageSrc(img)} alt="thumb" />
                        ))}
                    </div>
                </div>
            )}

            <div className="ad-card__content">
                <div>
                    <h3 className="ad-card__title">{title}</h3>

                    <p className="ad-card__price">{ad.price} €</p>

                    <div className="ad-card__tech">
                        <span>{ad.mileage} km</span>
                        <span>{ad.fuel}</span>
                        <span>{ad.transmission}</span>
                    </div>

                    <p className="ad-card__description">
                        {ad.description?.slice(0, 120)}...
                    </p>
                </div>

                {showFavorite && user && (
                    <div
                        className={`ad-card__favorite ${user?.favoriteAdIds?.includes(ad.id) ? "active" : ""}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(ad.id);
                        }}
                    >
                        {user?.favoriteAdIds?.includes(ad.id)
                            ? <AiFillHeart color={"red"} />
                            : <AiOutlineHeart />
                        }

                    </div>
                )}

                {actionsConfig && (
                    <div className="ad-card__actions">
                        {actionsConfig.map(({ onActionClick, ...rest } )=> (
                            <Button onClick={() => onActionClick(ad)} {...rest}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdCard;
