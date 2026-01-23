import { Injectable, signal } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UsersSampleData } from '../data/dummy-users';
import { UserRole } from '../models/user-roles.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersSignal = signal<UserModel[]>([]);
  private readonly localStorageKey = 'users';

  constructor() {
    const storedUsers = localStorage.getItem(this.localStorageKey);
    const initializedUsers = storedUsers ? JSON.parse(storedUsers) : UsersSampleData;
    this.usersSignal.set(initializedUsers);

    if (!storedUsers) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(initializedUsers));
    }
  }

  // Expose users as readonly signal
  users = this.usersSignal.asReadonly();

  /**
   * Get all users
   */
  getAll(): UserModel[] {
    return this.usersSignal();
  }

  /**
   * Get user by ID
   */
  getById(id: number): UserModel | undefined {
    return this.usersSignal().find((user) => user.id === id);
  }

  /**
   * Get user by email
   */
  getByEmail(email: string): UserModel | undefined {
    return this.usersSignal().find((user) => user.email.toLowerCase() === email.toLowerCase());
  }

  /**
   * Check if user exists by ID
   */
  userExists(id: number): boolean {
    return this.usersSignal().some((user) => user.id === id);
  }

  /**
   * Check if email exists
   */
  emailExists(email: string): boolean {
    return this.usersSignal().some((user) => user.email.toLowerCase() === email.toLowerCase());
  }

  /**
   * Get active users only
   */
  getActiveUsers(): UserModel[] {
    return this.usersSignal().filter((user) => user.isActive);
  }

  /**
   * Get inactive users only
   */
  getInactiveUsers(): UserModel[] {
    return this.usersSignal().filter((user) => !user.isActive);
  }

  /**
   * Get users by role
   */
  getUsersByRole(role: UserRole): UserModel[] {
    return this.usersSignal().filter((user) => user.role === role);
  }

  /**
   * Add a new user
   */
  addUser(user: Omit<UserModel, 'id'>): UserModel {
    const newId = Math.max(...this.usersSignal().map((u) => u.id), 0) + 1;
    const newUser: UserModel = {
      ...user,
      id: newId,
      fullName: user.fullName || `${user.firstName} ${user.lastName || ''}`.trim(),
    };

    this.usersSignal.update((users) => [...users, newUser]);
    this.persistUsers();

    return newUser;
  }

  /**
   * Update an existing user
   */
  updateUser(id: number, updates: Partial<UserModel>): boolean {
    const userIndex = this.usersSignal().findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return false;
    }

    this.usersSignal.update((users) => {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        ...updates,
        id, // Prevent ID from being changed
      };

      // Update fullName if firstName or lastName changed
      if (updates.firstName || updates.lastName) {
        updatedUsers[userIndex].fullName =
          `${updatedUsers[userIndex].firstName} ${updatedUsers[userIndex].lastName || ''}`.trim();
      }

      return updatedUsers;
    });

    this.persistUsers();

    return true;
  }

  /**
   * Delete a user by ID
   */
  deleteUser(id: number): boolean {
    const initialLength = this.usersSignal().length;
    this.usersSignal.update((users) => users.filter((user) => user.id !== id));
    this.persistUsers();
    return this.usersSignal().length < initialLength;
  }

  /**
   * Toggle user active status
   */
  toggleUserStatus(id: number): boolean {
    return this.updateUser(id, {
      isActive: !this.getById(id)?.isActive,
    });
  }

  /**
   * Search users by name or email
   */
  searchUsers(query: string): UserModel[] {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
      return this.usersSignal();
    }

    return this.usersSignal().filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerQuery) ||
        user.lastName?.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery) ||
        user.fullName?.toLowerCase().includes(lowerQuery),
    );
  }

  /**
   * Get total user count
   */
  getUserCount(): number {
    return this.usersSignal().length;
  }

  /**
   * Get active user count
   */
  getActiveUserCount(): number {
    return this.usersSignal().filter((user) => user.isActive).length;
  }

  /**
   * Sort users by field
   */
  sortUsers(field: keyof UserModel, order: 'asc' | 'desc' = 'asc'): UserModel[] {
    return [...this.usersSignal()].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      if (aVal === undefined || bVal === undefined) return 0;

      if (order === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }

  private persistUsers() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.usersSignal()));
  }
}
