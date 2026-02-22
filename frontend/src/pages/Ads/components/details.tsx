import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type {AdResponeType} from "../types.ts";
import Gallery from "../../../components/molecules/Gallery";
import SellerInfoCard from "../../../components/molecules/SellerInfoCard";
import TechnicalData from "../../../components/molecules/TechnicalData";
import {useApiHelpers} from "../apiHooks.ts";
import NotFound from "../../NotFound";

const AdDetailsPage = () => {
    const { id } = useParams();
    const { onGetAd, loading } = useApiHelpers();
    const [ad, setAd] = useState<AdResponeType | null>(null);

    useEffect(() => {
        if (!id) return;

        onGetAd(id, setAd)
    }, [id]);

    if (loading) return <div>Loading...</div>;

    if(!ad) return <NotFound />

    return (
        <div className="details">
            <div className="details__top">
                <Gallery images={ad?.images} />
                <SellerInfoCard ad={ad} />
            </div>

            <TechnicalData ad={ad} />

            <section className="details__description">
                <h2>Description</h2>
                <p>{ad?.description}</p>
            </section>

            <section className="details__comments">
                <h2>Comments</h2>
                <div className="comments-placeholder">
                    No comments yet.
                </div>
            </section>
        </div>
    );
};

export default AdDetailsPage;
