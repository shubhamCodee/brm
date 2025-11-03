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

// import Echo from 'laravel-echo';

// declare global {
//     interface Window {
//         Pusher: any;
//         Echo: Echo;
//     }
// }
