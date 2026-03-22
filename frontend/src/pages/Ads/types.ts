import {AD_STATUSES} from "./constants.ts";
import type {User} from "../../system/api/types.ts";
import type {ImageValue} from "../../components/molecules/ImageUploader/types.ts";
export type AdStatus = typeof AD_STATUSES[number];

type Ad<T> = {
    id: string,
    title: string,
    description: string,
    price: number,
    brand: string,
    model: string,
    year: number,
    transmission: string,
    fuel: string,
    mileage: number,
    userId?: string,
    images: T[];
    status?: AdStatus
};

export type AdRequestType = Ad<ImageValue> & {
    zip: string,
    country: string,
    city: string,
};
export type AdResponeType = Ad<string> & {
    location: string,
};

export type CreateEditConfig = {
    isEdit?: boolean
}

export type UserAdInfo = Omit<User, "favoriteAdIds">