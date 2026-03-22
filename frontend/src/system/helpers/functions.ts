import type {QueryParams} from "./types.ts";
import type {UserAdInfo} from "../../pages/Ads/types.ts";
import type {User} from "../api/types.ts";
import type {ImageValue} from "../../components/molecules/ImageUploader/types.ts";

export const generateUrl = (
    baseUrl: string,
    params?: QueryParams
): string => {
    if (!params || Object.keys(params).length === 0) {
        return baseUrl;
    }

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    });

    const queryString = searchParams.toString();

    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

export const getUserDisplayName = (user: User | UserAdInfo | null) => {
    if(!user) {
        return null
    }
    return user?.lastName && user?.firstName
        ? `${user?.firstName} ${user?.lastName}`
        :  user?.username
}


export const getImageSrc = (item: ImageValue) => {
    if (typeof item === "string") return item;
    return URL.createObjectURL(item);
};