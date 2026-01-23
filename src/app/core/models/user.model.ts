import { UserRole } from "./user-roles.model";

export type Guid = string;

export interface UserModel {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  role?: UserRole;
  isActive: boolean;
  createdAt: string; // ISO date
  avatarUrl?: string;
  fullName?: string;
}
