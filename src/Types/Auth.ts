export interface Auth {
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse extends Omit<Auth, "password"> {
  access_token: string;
  refresh_token: string;
}
