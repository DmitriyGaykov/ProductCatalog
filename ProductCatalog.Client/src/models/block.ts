import {User} from "./user.ts";

export interface Block {
  id?: string;
  userId?: string;
  administratorId?: string;
  reason?: string;
  createdAt?: string;
  deletedAt?: string;

  user?: User;
  administrator?: User
}