import type {AdRequestType, AdResponeType} from "../../../pages/Ads/types.ts";
import type {ButtonProps} from "../../atoms/Button/types.ts";

export type AdCardActionsConfigType = ButtonProps & {
    onActionClick: (ad: AdResponeType | AdRequestType) => void
}

export type AdCardPropsType = {
    ad: AdResponeType | AdRequestType;
    actionsConfig?: AdCardActionsConfigType[];
    showFavorite?: boolean
}