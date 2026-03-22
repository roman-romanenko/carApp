import {useEffect, useMemo, useState} from "react";
import { useAuth } from "../../system/context/AuthContext";
import {generatePath, useNavigate, useSearchParams} from "react-router-dom";
import {ADS_STATUS_TABS, PROFILE_TABS} from "./constans";
import Tabs from "../../components/atoms/Tabs";
import type {ProfileTabsType, StatusTabsType} from "./types.ts";
import Card from "../../components/molecules/Card";
import type {AdRequestType, AdResponeType} from "../Ads/types.ts";
import AdsList from "../../components/molecules/AdsList";
import Loader from "../../components/atoms/Loader";
import FormBuilder from "../../components/organisms/FormBuilder";
import {usePersonalFormConfig} from "./constantHooks.ts";
import {APP_ROUTES} from "../../system/router/constants.ts";
import type {AdCardActionsConfigType} from "../../components/molecules/AdCard/types.ts";
import {useApiHelpers} from "./apiHooks.ts";
import {useApiHelpers as useApiAdsHelpers} from "../Ads/apiHooks.ts";
import {getUserDisplayName} from "../../system/helpers/functions.ts";
import classNames from "classnames";
import Modal from "../../components/organisms/Modal";

const ProfilePage = () => {
    const [modal, setModal] = useState<{isOpen: boolean, id: string | null}>({isOpen: false, id: null});
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { user } = useAuth();
    const [ads, setAds] = useState<AdResponeType[]>([]);
    const [favoritesAds, setFavoritesAds] = useState<AdResponeType[]>([]);
    const {
        loading,
        onGetAdsByUser,
        onGetFavoriteAdsByUser,
        onUserUpdate,
    } = useApiHelpers();
    const { onUpdateStatus } = useApiAdsHelpers();

    const personalFormConfig = usePersonalFormConfig();

    const activeTab: ProfileTabsType = useMemo(() => {
        const tab = searchParams.get("tab");

        if (Object.keys(PROFILE_TABS).includes(tab as ProfileTabsType)) {
            return tab as ProfileTabsType;
        }

        return "info";
    }, [searchParams]);

    const activeStatusTab: StatusTabsType = useMemo(() => {
        if(activeTab !== 'ads') return "active";
        const status = searchParams.get("status");

        if (Object.keys(ADS_STATUS_TABS).includes(status as StatusTabsType)) {
            return status as StatusTabsType;
        }

        return "active";
    }, [searchParams, activeTab]);

    useEffect(() => {
        if(activeTab === "ads" && user) {
            onGetAdsByUser(activeStatusTab, setAds)
        } else if (activeTab === "favorites" && user) {
            onGetFavoriteAdsByUser(setFavoritesAds)
        }
    }, [activeTab, activeStatusTab, user]);

    const handleTabChange = (tab: ProfileTabsType) => {
        setSearchParams({ tab });
    };

    const handleStatusTabChange = (status: StatusTabsType) => {
        setSearchParams({ tab: activeTab, status });
    };

    const onUpdatePage = ({ id }: AdResponeType | AdRequestType) => {
        const link = generatePath(APP_ROUTES.ads.update, { id })

        navigate(link)
    }

    const onUserUpdateSubmit = (data: Record<string, any>) => {
        onUserUpdate({...user, ...data})
    }

    const actionsAdCardConfig: AdCardActionsConfigType[] = [
        {
            text: "Edit",
            kind: "primary",
            onActionClick: onUpdatePage
        },
        (activeStatusTab === "active"
            ? {
                    text: "Deactivate",
                    kind: "danger",
                    onActionClick:({id} ) => {
                        setModal({isOpen: true, id: id})
                    }
                }
            : {
                    text: "Activate",
                    kind: "outline",
                    onActionClick:({id} ) => onUpdateStatus("active", id)
                }
        )
    ]

    const goToDetails = ({ id }: AdResponeType | AdRequestType) => {
        const link = generatePath(APP_ROUTES.ads.details, { id });
        navigate(link);
    };

    const actionsFavoritesAdCardConfig: AdCardActionsConfigType[] = [
        {
            text: "Show Details",
            kind: "primary",
            onActionClick: goToDetails
        }
    ]

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-avatar">
                    <img src={user?.avatarUrl} alt="avatar" />
                </div>

                <div className="profile-meta">
                    <h2>{getUserDisplayName(user)}</h2>
                </div>
            </div>

            <Tabs
                tabs={PROFILE_TABS}
                activeTab={activeTab}
                onChange={handleTabChange}
                variant="horizontal"
            />

            <div className={classNames(
                "profile-page__card",
                activeTab === 'ads' && "profile-page__card--with-tabs")}>
                {
                    activeTab === 'ads' && (
                        <Tabs
                            tabs={ADS_STATUS_TABS}
                            activeTab={activeStatusTab}
                            onChange={handleStatusTabChange}
                            variant="vertical"
                        />
                    )
                }

                <Card maxContentSize={activeTab === "info" ? "sm" : undefined} >
                    {loading
                        ? ( <Loader />)
                        : (
                            <>
                                {activeTab === "info" && (
                                    <FormBuilder
                                        config={personalFormConfig}
                                        onSubmit={onUserUpdateSubmit}
                                        initialValues={user || {}}
                                    />
                                )}
                                {activeTab === "ads" && <AdsList ads={ads} actionsConfig={actionsAdCardConfig} />}
                                {activeTab === "favorites" && <AdsList ads={favoritesAds} showFavorite actionsConfig={actionsFavoritesAdCardConfig} />}
                            </>
                        )
                    }

                </Card>
            </div>

            <Modal
                isOpen={modal.isOpen}
                title="Deactivate Ad"
                text="Are you sure you want to deactivate this ad, or have you already sold the car?"
                onClose={() => setModal({isOpen: false, id: null})}
                buttons={[
                    {
                        text: "Cancel",
                        kind: "secondary",
                        onClick: () => setModal({isOpen: false, id: null}),
                    },
                    {
                        text: "Sold",
                        kind: "primary",
                        onClick: () => {
                            if(modal.id) {
                                onUpdateStatus("sold", modal.id)

                            }

                            setModal({isOpen: false, id: null});
                        },
                    },
                    {
                        text: "Deactivate",
                        kind: "danger",
                        onClick: () => {
                            if(modal.id) {
                                onUpdateStatus("deactivated", modal.id)

                            }
                            setModal({isOpen: false, id: null});
                        },
                    },
                ]}
            />


        </div>
    );
};

export default ProfilePage;
