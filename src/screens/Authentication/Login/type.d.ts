export interface IFormData {
  email: string;
  password: string;
}

interface ILoginData {
  accessToken: string;
  email: string;
  id: number;
  refreshToken: string;
  roles: string[];
  username: string;
}
