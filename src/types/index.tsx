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
export interface Card {
  id: number;
  title_front: string;
  title_back: string;
  deck_id: number;
}
export type UserState = {
  isConnected: boolean;
  isRegistered: boolean;
  errorMessage: string;
  isPending: boolean;
  user?: UserData;
};

export interface DeckData {
  title: string;
}

export interface CardData {
  title_front: string;
}
