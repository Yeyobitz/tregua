export type Role = 'admin' | 'manager' | 'staff';

export interface User {
  uid: string;
  email: string;
  role: Role;
  name?: string;
  createdAt: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}