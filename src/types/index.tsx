export type SettingsState = {
  displayModalLogIn: boolean;
  displayModalSignUp: boolean;
};
export interface UserData {
  password: string;
  email: string;
}

export interface Deck {
  id: number;
  title: string;
}
