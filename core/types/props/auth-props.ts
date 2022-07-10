import { UserType } from "../types";

export type AuthContextProps = {
  user: UserType | undefined;
  signInWithGoogle: () => Promise<void>;
};
