export type User = {
    id: string;
    userName: string;
    password: string;
    email: string;
    role: string;
};

export type ProtoUser = {
    userName?: string;
    password?: string;
    email?: string;
    role?: string;
};
