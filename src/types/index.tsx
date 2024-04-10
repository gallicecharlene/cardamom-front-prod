export type SettingsState = {
  displayModalLogIn: boolean;
  displayModalSignUp: boolean;
};
export interface UserData {
  password: string;
  email: string;
  pseudo: string;
}

export interface Deck {
  id: number;
  title: string;
}
export type UserState = {
  isConnected: boolean;
  isRegistered: boolean;
  errorMessage: string;
  isPending: boolean;
  user?: UserData;
};
