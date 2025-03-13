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
    updatedAt: string;
    modifiedAt: string;
}