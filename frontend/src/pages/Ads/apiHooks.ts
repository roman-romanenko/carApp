import {type Dispatch, type SetStateAction, useState} from "react";
import axios from "axios";
import {generatePath, useNavigate} from "react-router-dom";
import {useToast} from "../../system/context/ToasContext.tsx";
import {API_CREATE_AD, API_GET_AD_BY_ID, API_GET_ALL_ADS} from "../../system/api/apiUrls.ts";
import {APP_ROUTES} from "../../system/router/constants.ts";
import {useFormDataHelper} from "./hooks.ts";
import type {AdRequestType, AdResponeType} from "./types.ts";

export const useApiHelpers = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { buildAdFormData } = useFormDataHelper();

    const onCreate = (data: AdRequestType) => {
        setLoading(true);
        const formData = buildAdFormData(data);
        axios
            .post(API_CREATE_AD, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                showToast({ type: "success", message: `Add "${res.data.brand}" created successfully` });
                navigate(APP_ROUTES.index);
            })
            .catch((err) => {
                showToast({
                    type: "error",
                    message: err?.response?.data?.errorMessage || "Failed to create ad",
                });
            })
            .finally(() => setLoading(false));
    };

    const onGetAll = (
        setAds: Dispatch<SetStateAction<AdResponeType[]>>,
        filters: Record<string, any> = {}
    ) => {
        setLoading(true);
        axios
            .get(API_GET_ALL_ADS, {
                params: filters,
            })
            .then((res) => {
                setAds(res.data)
            })
            .catch((err) => {
                showToast({
                    type: "error",
                    message: err?.response?.data?.errorMessage || "Failed to get ads",
                });
            })
            .finally(() => setLoading(false));
    };

    const onGetAd = (
        id: string,
        setAd: Dispatch<SetStateAction<AdResponeType | null>>
    ) => {
        setLoading(true);
        axios
            .get(generatePath(API_GET_AD_BY_ID, { id }))
            .then((res) => setAd(res.data))
            .catch((err) => {
                showToast({
                    type: "error",
                    message: err?.response?.data?.errorMessage || "Failed to get add",
                });
            })
            .finally(() => setLoading(false));
    };

    return { onCreate, loading, onGetAll, onGetAd };
};
