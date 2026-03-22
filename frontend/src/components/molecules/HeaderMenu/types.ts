import type {User} from "../../../system/api/types.ts";

export type HeaderMenuProps = {
    user: User;
    onLogout: () => void;
};
