export interface IUser {
  id: string;
  name: string;
  profilePicture: string;
  loginId: string;
}

export interface IAuthContext {
  user: IUser | null;
  setUser: (setUser: IUser) => void;
}
