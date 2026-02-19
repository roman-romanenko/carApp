import {useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import AdCard from "../../components/molecules/AdCard";
import { useApiHelpers } from "./apiHooks.ts";
import FormBuilder from "../../components/organisms/FormBuilder";
import { useSearchFormConfig } from "./constantHooks.ts";
import type {AdResponeType} from "./types.ts";

export const AdsPage = () => {
    const [ads, setAds] = useState<AdResponeType[]>([]);
    const { onGetAll } = useApiHelpers();
    const searchConfig = useSearchFormConfig();
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = Object.fromEntries(searchParams.entries());

    useEffect(() => {
        onGetAll(setAds, filters);
    }, [searchParams]);

    const handleFilterChange = (values: Record<string, any>) => {
        const cleaned = Object.fromEntries(
            Object.entries(values).filter(([_, v]) => v)
        );

        setSearchParams(cleaned);
    };

    return (
        <div className="main-page">
            <FormBuilder
                config={searchConfig}
                initialValues={filters}
                onSubmit={handleFilterChange}
                submitText="Filter"
                className="form-builder form-builder__ads-dashboard"
            />

            <div className="ads-list">
                {ads.map(ad => (
                    <AdCard key={ad.id} ad={ad} />
                ))}
            </div>
        </div>
    );
};
