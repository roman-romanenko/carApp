import AdCard from "../AdCard";
import type {AdListPropsType} from "./types.ts";

const AdsList = ({ ads, actionsConfig, showFavorite }: AdListPropsType) => {
    return (
        <div className="ads-list">
            {ads.map(ad => (
                <AdCard key={ad.id} ad={ad} actionsConfig={actionsConfig} showFavorite={showFavorite} />
            ))}
        </div>
    );
};

export default AdsList;