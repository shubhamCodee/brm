export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    profile_picture?: string | null;
}

export type PageProps = {
    users: User[];
    auth: {
        user: User | null;
    };
};
