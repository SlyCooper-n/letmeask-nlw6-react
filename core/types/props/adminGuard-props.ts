import { ReactNode } from "react";

export interface AdminGuardProps {
  userID: string | undefined;
  roomAuthor: string;
  roomID: string;
  children: ReactNode | ReactNode[];
}
