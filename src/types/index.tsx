export type SettingsState = {
  displayModalLogIn: boolean;
  displayModalSignUp: boolean;
  isConnected: boolean;
  errorMessage: string;
  user?: {
    username: string;
    password: string;
    email: string;
  };
};
export interface UserData {
  password: string;
  email: string;
}

export interface Deck {
  pokedex_id: number;
  generation: number;
  category: string;
  name: string;
}
