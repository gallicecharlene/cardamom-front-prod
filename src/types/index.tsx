export type SettingsState = {
  displayModalLogIn: boolean;
  displayModalSignUp: boolean;
};
export interface UserData {
  password: string;
  email: string;
}
export type UserState = {
  isConnected: boolean;
  errorMessage: string;
  user?: {
    username: string;
    password: string;
    email: string;
  };
};
