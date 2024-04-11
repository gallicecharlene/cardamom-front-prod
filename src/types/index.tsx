export type SettingsState = {
  displayModalLogIn: boolean;
  displayModalSignUp: boolean;
};
export type UserState = {
  isConnected: boolean;
  isRegistered: boolean;
  errorMessage: string;
  isPending: boolean;
  user?: UserData;
};
export interface UserData {
  password: string;
  email: string;
  pseudo: string;
  token: string;
}

export interface Deck {
  id: number;
  title: string;
}
export interface Card {
  id: number;
  title_front: string;
  title_back: string;
  deck_id: number;
}
