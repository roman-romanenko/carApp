export type User = {
    id: string;
    username: string;
    avatarUrl: string;
};

export type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};