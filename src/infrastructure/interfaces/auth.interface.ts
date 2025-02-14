export interface AuthResponse {
  userId: string;
}

export interface UserResponse {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  statusId: number;
  bio: string;
}

export interface UserStatusResponse {
  id: string;
  name: string;
}
