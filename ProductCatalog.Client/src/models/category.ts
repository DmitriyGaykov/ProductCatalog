import {User} from "./user.ts";

export interface Category {
  id?: string;
  name?: string;
  userId?: string;

  createdAt?: string;
  modifiedAt?: string;
  deletedAt?: string;

  user?: User
}
