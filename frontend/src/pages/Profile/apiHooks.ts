import {type Dispatch, type SetStateAction, useState} from "react";
import axios from "axios";
import {useToast} from "../../system/context/ToasContext.tsx";
import {
    API_GET_ADS_BY_USER,
    API_GET_USER_FAVORITES, API_UPDATE_CURRENT_USER
} from "../../system/api/apiUrls.ts";
import type {AdResponeType} from "../Ads/types.ts";
import type {User} from "../../system/api/types.ts";
import {useAuth} from "../../system/context/AuthContext.tsx";
import type {StatusTabsType} from "./types.ts";
import {generateUrl} from "../../system/helpers/functions.ts";

export const useApiHelpers = () => {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuth();

    const onGetAdsByUser = (
        status: StatusTabsType,
        setAds: Dispatch<SetStateAction<AdResponeType[]>>,
    ) => {
        setLoading(true);
        axios
            .get(generateUrl(API_GET_ADS_BY_USER, { status: status.toUpperCase()}))
            .then((res) => setAds(res.data))
            .catch((err) => {
                showToast({
                    type: "error",
                    message: err?.response?.data?.errorMessage || "Failed to get adds",
                });
            })
            .finally(() => setLoading(false));
    };

    const onGetFavoriteAdsByUser = (
        setAds: Dispatch<SetStateAction<AdResponeType[]>>,
    ) => {
        setLoading(true);
        axios
            .get(API_GET_USER_FAVORITES)
            .then((res) => setAds(res.data))
            .catch((err) => {
                showToast({
                    type: "error",
                    message: err?.response?.data?.errorMessage || "Failed to get Favorites adds",
                });
            })
            .finally(() => setLoading(false));
    };

    const onUserUpdate = (data: Partial<User>) => {
        setLoading(true);
        axios
            .put(API_UPDATE_CURRENT_USER, data)
            .then((res) => {
                const updatedUser: User = res.data

                setUser(updatedUser);
                showToast({ type: "success", message: `User "${updatedUser.username}" updated successfully` });
            })
            .catch((err) => {
                showToast({
                    type: "error",
                    message: err?.response?.data?.errorMessage || "Failed to update user",
                });
            })
            .finally(() => setLoading(false));
    };

    return { loading, onGetAdsByUser, onGetFavoriteAdsByUser, onUserUpdate };
};
