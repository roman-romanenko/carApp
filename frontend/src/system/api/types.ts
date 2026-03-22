export type User = {
    id: string;
    username: string;
    avatarUrl: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    favoriteAdIds: string[] | null;
};