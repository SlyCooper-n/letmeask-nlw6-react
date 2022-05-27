export type AuthContextProps = {
  user: UserType | undefined;
  signInWithGoogle: () => Promise<void>;
};

export type UserType = {
  id: string;
  name: string;
  avatar: string;
};
