import AdCard from "../AdCard";
import type {AdRequestType} from "../../../pages/Ads/types.ts";

type AdPreviewProps = {
    data: Record<string, any>;
};

const AdPreview = ({ data }: AdPreviewProps) => {
    return (
        <div className="ad-preview">
            <AdCard ad={data as AdRequestType} />
        </div>
    );
};

export default AdPreview;
