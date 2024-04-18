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
export interface Stats {
  userId: string;
  statsId: string;
  nb_card_consulted: number;
  nb_card_succes: number;
  token: string;
  deck_id: number;
}

export interface Deck {
  id: number;
  title: string;
  share_id: string;
  flashcards?: [Card];
}
export interface Card {
  id: number;
  title_front: string;
  title_back: string;
  deck_id: number;
}
