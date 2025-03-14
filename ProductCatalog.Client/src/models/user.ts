import {Block} from "./block.ts";

export const Roles = {
    User: "User",
    AdvancedUser: "AdvancedUser",
    Admin: "Admin",
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    deletedAt: string;
    modifiedAt: string;

    blocks?: Block[];
}