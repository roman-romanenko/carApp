import type {User} from "../../../system/context/types.ts";

export type HeaderMenuProps = {
    user: User;
    onLogout: () => void;
};
