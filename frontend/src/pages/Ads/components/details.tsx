import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type {AdResponeType} from "../types.ts";
import Gallery from "../../../components/molecules/Gallery";
import SellerInfoCard from "../../../components/molecules/SellerInfoCard";
import TechnicalData from "../../../components/molecules/TechnicalData";

const AdDetailsPage = () => {
    const { id } = useParams();
    const [ad, setAd] = useState<AdResponeType | null>(null);

    useEffect(() => {
        axios.get(`/api/ads/${id}`)
            .then(res => setAd(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!ad) return <div>Loading...</div>;

    return (
        <div className="details">
            <div className="details__top">
                <Gallery images={ad.images} />
                <SellerInfoCard ad={ad} />
            </div>

            <TechnicalData ad={ad} />

            <section className="details__description">
                <h2>Description</h2>
                <p>{ad.description}</p>
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
