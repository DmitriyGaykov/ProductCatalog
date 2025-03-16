import {User} from "./user.ts";
import {Category} from "./category.ts";

export interface Product {
  id?: string;
  name?: string;
  description?: string;
  notes?: string;
  specialNotes?: string;
  price?: number;

  categoryId?: string;
  userId?: string;

  createdAt?: string;
  modifiedAt?: string;
  deletedAt?: string;

  category?: Category;
  user?: User
}