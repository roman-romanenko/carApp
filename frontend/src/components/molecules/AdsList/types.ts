import type {AdResponeType} from "../../../pages/Ads/types.ts";
import type {AdCardActionsConfigType} from "../AdCard/types.ts";

export type AdListPropsType = {
    ads: AdResponeType[];
    actionsConfig?: AdCardActionsConfigType[];
    showFavorite?: boolean
}