import {useEffect, useState} from "react";
import {generatePath, useNavigate, useSearchParams} from "react-router-dom";
import { useApiHelpers } from "./apiHooks.ts";
import FormBuilder from "../../components/organisms/FormBuilder";
import { useSearchFormConfig } from "./constantHooks.ts";
import type {AdResponeType} from "./types.ts";
import Loader from "../../components/atoms/Loader";
import AdsList from "../../components/molecules/AdsList";
import {APP_ROUTES} from "../../system/router/constants.ts";
import type {AdCardActionsConfigType} from "../../components/molecules/AdCard/types.ts";

export const AdsPage = () => {
    const navigate = useNavigate();
    const [ads, setAds] = useState<AdResponeType[]>([]);
    const { onGetAll, loading } = useApiHelpers();
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

    const goToDetails = ({ id }: AdResponeType) => {
        const link = generatePath(APP_ROUTES.ads.details, { id });
        navigate(link);
    };

    const actionsAdCardConfig: AdCardActionsConfigType[] = [
        {
            text: "Show Details",
            kind: "primary",
            onActionClick: goToDetails
        }
    ]
    if (loading) {
        return <Loader />;
    }

    return (
        <div className="main-page">
                <FormBuilder
                    config={searchConfig}
                    initialValues={filters}
                    onSubmit={handleFilterChange}
                    submitText="Filter"
                    className="form-builder form-builder__ads-dashboard"
                />
                <AdsList
                    ads={ ads }
                    actionsConfig={actionsAdCardConfig}
                    showFavorite
                />
        </div>
    );
};
